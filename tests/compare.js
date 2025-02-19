#!/usr/bin/env node

const fs = require(`fs`)
const chalk = require(`chalk`)

function parseJsonLines(filePath) {
    const fileContent = fs.readFileSync(filePath, `utf8`)
    return fileContent
        .split(`\n`) // Split by newline
        .filter((line) => line.trim() !== ``) // Remove empty lines
        .map((line) => JSON.parse(line)) // Parse each line as JSON
}

const release1 = parseJsonLines(process.argv[2])
const release2 = parseJsonLines(process.argv[3])

function calculatePercentiles(values) {
    values.sort((a, b) => a - b) // Sort values in ascending order
    return {
        p50: values[Math.floor(values.length * 0.50)], // 50th percentile (median)
        p95: values[Math.floor(values.length * 0.95)], // 95th percentile
        p99: values[Math.floor(values.length * 0.99)], // 99th percentile
    }
}

function extractMetrics(data) {
    const metrics = {}
    data.forEach((entry) => {
        if (entry.type === `Point` && entry.metric === `http_req_duration`) {
            const { value } = entry.data
            const { name } = entry.data.tags

            if (!metrics[name]) {
                metrics[name] = []
            }
            metrics[name].push(value)
        }
    })
    return metrics
}

function calculatePercentilesForMetrics(metrics) {
    const percentiles = {}
    for (const [name, values] of Object.entries(metrics)) {
        percentiles[name] = calculatePercentiles(values)
    }
    return percentiles
}

function comparePercentiles(percentiles1, percentiles2) {
    const deltas = {}
    for (const [name, p1] of Object.entries(percentiles1)) {
        const p2 = percentiles2[name]
        if (p2) {
            deltas[name] = {
                p50: ((p2.p50 - p1.p50) / p1.p50) * 100,
                p95: ((p2.p95 - p1.p95) / p1.p95) * 100,
                p99: ((p2.p99 - p1.p99) / p1.p99) * 100,
            }
        }
    }
    return deltas
}

const metrics1 = extractMetrics(release1)
const metrics2 = extractMetrics(release2)
const percentiles1 = calculatePercentilesForMetrics(metrics1)
const percentiles2 = calculatePercentilesForMetrics(metrics2)
const deltas = comparePercentiles(percentiles1, percentiles2)

const colors = (data) => {
    if (data >= 20) {
        return chalk.yellow(data)
    }
    if (data >= 30) {
        return chalk.red(data)
    }
    return chalk.green(data)
}

// Function to pad strings to a fixed width
const pad = (str, length) => str.padEnd(length, ` `)

// Column widths
const nameWidth = 40
const percentileWidth = 20

console.log(chalk.bold(`Percentiles for Release 1:`))
console.log(pad(`Name`, nameWidth) + pad(`p50`, percentileWidth) + pad(`p95`, percentileWidth) + pad(`p99`, percentileWidth))
for (const [name, p] of Object.entries(percentiles1)) {
    console.log(
        pad(name, nameWidth)
        + pad(p.p50.toFixed(2), percentileWidth)
        + pad(p.p95.toFixed(2), percentileWidth)
        + pad(p.p99.toFixed(2), percentileWidth),
    )
}

console.log(chalk.bold(`Percentiles for Release 2:`))
console.log(pad(`Name`, nameWidth) + pad(`p50`, percentileWidth) + pad(`p95`, percentileWidth) + pad(`p99`, percentileWidth))
for (const [name, p] of Object.entries(percentiles2)) {
    console.log(
        pad(name, nameWidth)
        + pad(p.p50.toFixed(2), percentileWidth)
        + pad(p.p95.toFixed(2), percentileWidth)
        + pad(p.p99.toFixed(2), percentileWidth),
    )
}

console.log(chalk.bold(`Percentage Deltas:`))
console.log(pad(`Name`, nameWidth) + pad(`p50`, percentileWidth) + pad(`p95`, percentileWidth) + pad(`p99`, percentileWidth))
for (const [name, delta] of Object.entries(deltas)) {
    console.log(
        pad(name, nameWidth)
        + colors(pad(`${delta.p50.toFixed(2)}`, percentileWidth))
        + colors(pad(`${delta.p95.toFixed(2)}`, percentileWidth))
        + colors(pad(`${delta.p99.toFixed(2)}`, percentileWidth)),
    )
}
