/* eslint-disable dot-notation */
import test from '@lib/BaseTest'
import Airtable, { Table } from 'airtable'

test.describe.configure({ mode: `parallel` })

test(`@AccountImage @Marketplace Check marketplace apps`, async ({ marketplace }) => {
    await marketplace.open()
    await marketplace.checkDefaultAppsList()
})

test(`@AccountImage @Marketplace Check favorites filter`, async ({ marketplace }) => {
    await marketplace.open()
    const appName = `Aave`
    await marketplace.addFavoriteApp(appName)
    await marketplace.filterFavorites(appName)
    await marketplace.checkGroupsVisible(appName, 1)
})

test.skip(`@AccountImage @Marketplace Propose a new app`, async ({ context, marketplace }) => {
    await marketplace.open()
    await marketplace.submitNewApp(context, {
        Name: `New app`,
        ContractAddr: `0x`,
        WebsiteURL: `http://ya.ru`,
        TwitterURL: `http://ya.ru`,
        DiscordURL: `http://ya.ru`,
        GithubURL: `http://ya.ru`,
        Contact: `Johny Walker`,
        ContactEmail: `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`,
        ResponseEmail: `3cad691b-44e3-4613-bab2-c3ef59ae1f03@mailslurp.com`,
    })
    // const base = new Airtable({ apiKey: process.env.BLOCKSCOUT_AIRTABLE_TOKEN }).base(process.env.BLOCKSCOUT_AIRTABLE_DB)

    // const results = await base(`Public_Tags_Test`).select({
    //     sort: [{ field: `request_id`, direction: `desc` }],
    //     maxRecords: 1,
    //     view: `Grid view`,
    // }).all()

    // console.log(`results: ${JSON.stringify(results)}`)
})
