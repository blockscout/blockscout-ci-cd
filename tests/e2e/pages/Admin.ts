import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { CommonPage } from "./Common"

interface Submission {
    IsUserSubmitted: boolean
    TokenAddress: string
    ChainID: string
    BlockscoutUserEmail: string
    RequesterName: string
    RequesterEmail: string
    ProjectName: string
    ProjectWebSite: string
    IconURL: string
    ProjectEmail: string
    ProjectSector: string
    ProjectDescription: string
    Comment: string
    Docs: string
    Github: string
    Telegram: string
    Linkedin: string
    Discord: string
    Slack: string
    Twitter: string
    OpenSea: string
    Facebook: string
    Medium: string
    Reddit: string
    Support: string
    CMCTickerURL: string
    CGTickerURL: string
    LlamaTickerURL: string
}

interface SuperSubmission {
    ChainID: string
    TokenAddress: string
    BlockscoutUserEmail: string
    RequesterName: string
    RequesterEmail: string
    ProjectName: string
    ProjectWebSite: string
    IconURL: string
    ProjectEmail: string
    ProjectSector: string
    Comment: string
    Docs: string
    Github: string
    Telegram: string
    Linkedin: string
    Discord: string
    Slack: string
    Twitter: string
    OpenSea: string
    Facebook: string
    Medium: string
    Reddit: string
    Support: string
    CMCTickerURL: string
    CGTickerURL: string
    LlamaTickerURL: string
}

export class AdminPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`https://admin.services.blockscout.com/admin/login/`)
    }

    async openSubmissions(): Promise<void> {
        await this.actions.navigateToURL(`https://admin.services.blockscout.com/admin/resources/allSubmissions`)
    }

    async selectTokenServicesTab(): Promise<void> {
        await this.actions.clickElement(`text=Token services`)
    }

    async selectTokenInfosTab(): Promise<void> {
        await this.actions.clickElement(`text=Token infos`)
    }

    async selectTODOSubmissions(): Promise<void> {
        await this.actions.clickElement(`text=Todo Submissions`)
    }

    async selectSuperUserTab(): Promise<void> {
        await this.actions.clickElement(`text=Super User`)
    }

    async selectSuperUserTabSubmissions(): Promise<void> {
        await this.actions.clickElement(`text=Super Submissions`)
    }

    async clearTokenInfo(token: string): Promise<void> {
        await this.filterByTokenAddress(token)
        const noRecords = await this.actions.page.$(`text=No Records`)
        if (noRecords) {
            return
        }
        await this.selectFirstSubmission()
        await this.deleteTokenInfo()
    }

    async clearMySubmissions(email: string): Promise<void> {
        await this.filterByEmail(email)
        const noRecords = await this.actions.page.$(`text=No Records`)
        if (noRecords) {
            return
        }
        await this.actions.clickElement(`thead >> tr >> td >> nth=0 >> span`)
        await this.actions.clickElement(`text=Delete all`)
        await this.actions.clickElement(`text=Confirm the removal`)
    }

    async filterByEmail(email: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-blockscout_user_email"]`, email)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterByTokenAddress(email: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-address"]`, email)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async selectFirstSubmission(): Promise<void> {
        await this.actions.clickElement(`tr >> nth=1 >> td >> nth=4`)
    }

    async deleteTokenInfo(): Promise<void> {
        this.page.on(`dialog`, (dialog) => dialog.accept())
        await this.actions.clickElement(`text=Delete`)
    }

    async approve(): Promise<void> {
        await this.actions.clickElement(`text=Approve`)
    }

    async createNewTokenInfo(sub: Submission): Promise<void> {
        await this.actions.clickElement(`text=Create new`)
        await this.actions.clickElement(`input >> nth=1`)
        await this.actions.clickElement(`[aria-current="date"]`)
        await this.actions.enterElementText(`input >> nth=2`, sub.TokenAddress)
        await this.actions.enterElementText(`input >> nth=3`, sub.ChainID)
        await this.actions.enterElementText(`input >> nth=4`, sub.ProjectName)
        await this.actions.enterElementText(`input >> nth=5`, sub.ProjectWebSite)
        await this.actions.enterElementText(`input >> nth=6`, sub.RequesterEmail)
        await this.actions.enterElementText(`input >> nth=7`, sub.IconURL)
        await this.actions.enterElementText(`input >> nth=8`, sub.ProjectSector)
        await this.actions.enterElementText(`input >> nth=9`, sub.ProjectDescription)
        await this.actions.enterElementText(`input >> nth=10`, sub.Docs)
        await this.actions.enterElementText(`input >> nth=11`, sub.Github)
        await this.actions.enterElementText(`input >> nth=12`, sub.Telegram)
        await this.actions.enterElementText(`input >> nth=13`, sub.Linkedin)
        await this.actions.enterElementText(`input >> nth=14`, sub.Discord)
        await this.actions.enterElementText(`input >> nth=15`, sub.Slack)
        await this.actions.enterElementText(`input >> nth=16`, sub.Twitter)
        await this.actions.enterElementText(`input >> nth=17`, sub.OpenSea)
        await this.actions.enterElementText(`input >> nth=18`, sub.Facebook)
        await this.actions.enterElementText(`input >> nth=19`, sub.Medium)
        await this.actions.enterElementText(`input >> nth=20`, sub.Reddit)
        await this.actions.enterElementText(`input >> nth=21`, sub.Support)

        await this.actions.enterElementText(`input >> nth=22`, sub.CMCTickerURL)
        await this.actions.enterElementText(`input >> nth=23`, sub.CGTickerURL)
        await this.actions.enterElementText(`input >> nth=24`, sub.LlamaTickerURL)
        await this.actions.clickElement(`section[data-testid="property-edit-is_user_submitted"] >> span`)
        await this.actions.clickElement(`text=Save`)
    }

    async createNewAdminSubmission(sub: SuperSubmission): Promise<void> {
        await this.actions.clickElement(`text=Create new`)
        await this.actions.clickElement(`input >> nth=1`)
        await this.actions.clickElement(`[aria-current="date"]`)
        await this.actions.enterElementText(`input >> nth=2`, sub.ChainID)
        await this.actions.enterElementText(`input >> nth=3`, sub.TokenAddress)
        await this.actions.enterElementText(`input >> nth=4`, sub.BlockscoutUserEmail)
        await this.actions.enterElementText(`input >> nth=5`, sub.RequesterName)
        await this.actions.enterElementText(`input >> nth=6`, sub.RequesterEmail)
        await this.actions.enterElementText(`input >> nth=7`, sub.ProjectName)
        await this.actions.enterElementText(`input >> nth=8`, sub.ProjectWebSite)
        await this.actions.enterElementText(`input >> nth=9`, sub.ProjectEmail)
        await this.actions.enterElementText(`input >> nth=10`, sub.IconURL)
        await this.actions.enterElementText(`input >> nth=11`, sub.ProjectSector)
        await this.actions.enterElementText(`input >> nth=12`, sub.Comment)
        await this.actions.enterElementText(`input >> nth=13`, sub.Docs)
        await this.actions.enterElementText(`input >> nth=14`, sub.Github)
        await this.actions.enterElementText(`input >> nth=15`, sub.Telegram)
        await this.actions.enterElementText(`input >> nth=16`, sub.Linkedin)
        await this.actions.enterElementText(`input >> nth=17`, sub.Discord)
        await this.actions.enterElementText(`input >> nth=18`, sub.Slack)
        await this.actions.enterElementText(`input >> nth=19`, sub.Twitter)
        await this.actions.enterElementText(`input >> nth=20`, sub.OpenSea)
        await this.actions.enterElementText(`input >> nth=21`, sub.Facebook)
        await this.actions.enterElementText(`input >> nth=22`, sub.Medium)
        await this.actions.enterElementText(`input >> nth=23`, sub.Reddit)
        await this.actions.enterElementText(`input >> nth=25`, sub.Support)
        await this.actions.enterElementText(`input >> nth=26`, sub.CMCTickerURL)
        await this.actions.enterElementText(`input >> nth=27`, sub.CGTickerURL)
        await this.actions.enterElementText(`input >> nth=28`, sub.LlamaTickerURL)
        await this.actions.clickElement(`text=Save`)
    }

    async login(login: string, password: string) {
        await this.actions.enterElementText(`input >> nth=0`, login)
        await this.actions.enterElementText(`input >> nth=1`, password)
        await this.actions.clickElement(`button >> nth=0`)
    }
}
