const fs = require(`fs`)
const chalk = require(`chalk`)

// Function to parse JSON Lines file
function parseJsonLines(filePath) {
    const fileContent = fs.readFileSync(filePath, `utf8`)
    return fileContent
        .split(`\n`) // Split by newline
        .filter((line) => line.trim() !== ``) // Remove empty lines
        .map((line) => JSON.parse(line)) // Parse each line as JSON
}

// Load the JSON Lines files
const release1 = parseJsonLines(process.env.BEFORE)
const release2 = parseJsonLines(process.env.NOW)

// Function to calculate percentiles (50th, 95th, 99th)
function calculatePercentiles(values) {
    values.sort((a, b) => a - b) // Sort values in ascending order
    return {
        p50: values[Math.floor(values.length * 0.50)], // 50th percentile (median)
        p95: values[Math.floor(values.length * 0.95)], // 95th percentile
        p99: values[Math.floor(values.length * 0.99)], // 99th percentile
    }
}

// Extract http_req_duration metrics grouped by data.tags.name
function extractMetrics(data) {
    const metrics = {}
    data.forEach((entry) => {
        if (entry.type === `Point` && entry.metric === `http_req_duration`) {
            const {value} = entry.data
            const {name} = entry.data.tags

            if (!metrics[name]) {
                metrics[name] = []
            }
            metrics[name].push(value)
        }
    })
    return metrics
}

// Calculate percentiles for each unique name
function calculatePercentilesForMetrics(metrics) {
    const percentiles = {}
    for (const [name, values] of Object.entries(metrics)) {
        percentiles[name] = calculatePercentiles(values)
    }
    return percentiles
}

// Compare percentiles and calculate percentage deltas
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

// Extract metrics
const metrics1 = extractMetrics(release1)
const metrics2 = extractMetrics(release2)

// Calculate percentiles
const percentiles1 = calculatePercentilesForMetrics(metrics1)
const percentiles2 = calculatePercentilesForMetrics(metrics2)

// Compare percentiles
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

// Print percentiles for each release
console.log(chalk.bold(`Percentiles for Release 1:`))
for (const [name, p] of Object.entries(percentiles1)) {
    console.log(`Name: ${name}`)
    console.log(`  p50: ${p.p50.toFixed(2)}`)
    console.log(`  p95: ${p.p95.toFixed(2)}`)
    console.log(`  p99: ${p.p99.toFixed(2)}`)
    console.log(`---`)
}

console.log(chalk.bold(`Percentiles for Release 2:`))
for (const [name, p] of Object.entries(percentiles2)) {
    console.log(`Name: ${name}`)
    console.log(`  p50: ${p.p50.toFixed(2)}`)
    console.log(`  p95: ${p.p95.toFixed(2)}`)
    console.log(`  p99: ${p.p99.toFixed(2)}`)
    console.log(`---`)
}

// Print percentage deltas
console.log(chalk.bold(`Percentage Deltas:`))
for (const [name, delta] of Object.entries(deltas)) {
    console.log(`Name: ${name}`)
    console.log(colors(`p50: ${delta.p50.toFixed((2))}`))
    console.log(colors(`p95: ${delta.p95.toFixed((2))}`))
    console.log(colors(`p90: ${delta.p99.toFixed((2))}`))
    console.log(`---`)
}
