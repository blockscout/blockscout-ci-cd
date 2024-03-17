import { WebActions } from "@lib/WebActions"
import type { BrowserContext, Page } from 'playwright'
import { CommonPage } from "./Common"

interface Submission {
    IsUserSubmitted: boolean
    TokenAddress: string
    ChainID: string
    BlockscoutUserEmail: string
    RequesterName: string
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
    ProjectDescription: string
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

    baseURL: string

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    setBaseURL(url: string) {
        this.baseURL = url
    }

    async open(): Promise<void> {
        await this.actions.navigateToURL(`${this.baseURL}/admin/login/`)
    }

    async openSubmissions(): Promise<void> {
        await this.actions.navigateToURL(`${this.baseURL}/admin/resources/allSubmissions`)
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

    async approveTestUserSubmission(userEmail: string):Promise<void> {
        await this.actions.clickElement(`text=/${userEmail}/ >> nth=1`)
        await this.actions.clickElement(`text=/Approve/`)
    }

    async selectSuperUserTab(): Promise<void> {
        await this.actions.clickElement(`text=Super User`)
    }

    async selectSuperUserTabSubmissions(): Promise<void> {
        await this.actions.clickElement(`text=Super Submissions`)
    }

    async clearTokenInfo(token: string): Promise<void> {
        await this.filterByTokenAddress(token)
        await this.delay(1000)
        const noRecords = await this.actions.page.$(`text=No Records`)
        if (noRecords) {
            return
        }
        await this.selectFirstListElement()
        await this.deleteTokenInfo()
    }

    async clearMySubmissions(email: string): Promise<void> {
        await this.filterByEmail(email)
        const noRecords = await this.actions.page.$$(`text=/No Records/`)
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

    async filterByAddress(addr: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-address"]`, addr)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterByInputRef(inputName: string, filter: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="${inputName}"]`, filter)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterBySlug(addr: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-address"]`, addr)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterByEmailProjectName(projectName: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-project_name"]`, projectName)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterByEmailStatus(email: string, status: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-blockscout_user_email"]`, email)
        await this.actions.clickElement(`input[id="react-select-5-input"]`)
        await this.actions.clickElement(`form >> text=/${status}/ >> nth=1`)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async filterByTokenAddress(email: string): Promise<void> {
        await this.actions.clickElement(`text=Filter`)
        await this.actions.enterElementText(`input[name="filter-address"]`, email)
        await this.actions.clickElement(`text=Apply changes`)
    }

    async selectFirstListElement(): Promise<void> {
        await this.actions.clickElement(`tr >> nth=1 >> td >> nth=1`)
    }

    async selectLastSubmissionSorted(): Promise<void> {
        await this.actions.clickElement(`text=/Id/ >> nth=0`)
        await this.actions.clickElement(`text=/Id/ >> nth=0`)
        await this.delay(3000)
        await this.selectFirstListElement()
    }

    async deleteTokenInfo(): Promise<void> {
        this.page.on(`dialog`, (dialog) => dialog.accept())
        await this.actions.clickElement(`text=Delete`)
        await this.actions.clickElement(`button >> nth=2`)
    }

    async closeFilterPanel(): Promise<void> {
        await this.actions.clickElement(`form >> button >> svg`)
    }

    async approve(): Promise<void> {
        await this.actions.clickElement(`text=Approve`)
    }

    async createNewTokenInfo(sub: Submission): Promise<void> {
        await this.actions.clickElement(`text=Create new`)
        await this.actions.enterElementText(`input >> nth=0`, sub.TokenAddress)
        await this.actions.clickElement(`input >> nth=1`)
        await this.actions.clickElement(`body >> section >> nth=5 >> text=${sub.ChainID} >> nth=1`)
        await this.actions.enterElementText(`input >> nth=2`, sub.ProjectName)
        await this.actions.enterElementText(`input >> nth=3`, sub.ProjectWebSite)
        await this.actions.enterElementText(`input >> nth=4`, sub.ProjectEmail)
        await this.actions.enterElementText(`input >> nth=5`, sub.IconURL)
        await this.actions.clickElement(`input >> nth=6`)
        await this.actions.clickElement(`text=${sub.ProjectSector}`)
        await this.actions.enterElementText(`input >> nth=7`, sub.ProjectDescription)
        await this.actions.enterElementText(`input >> nth=8`, sub.Docs)
        await this.actions.enterElementText(`input >> nth=9`, sub.Github)
        await this.actions.enterElementText(`input >> nth=10`, sub.Telegram)
        await this.actions.enterElementText(`input >> nth=11`, sub.Linkedin)
        await this.actions.enterElementText(`input >> nth=12`, sub.Discord)
        await this.actions.enterElementText(`input >> nth=13`, sub.Slack)
        await this.actions.enterElementText(`input >> nth=14`, sub.Twitter)
        await this.actions.enterElementText(`input >> nth=15`, sub.OpenSea)
        await this.actions.enterElementText(`input >> nth=16`, sub.Facebook)
        await this.actions.enterElementText(`input >> nth=17`, sub.Medium)
        await this.actions.enterElementText(`input >> nth=18`, sub.Reddit)
        await this.actions.enterElementText(`input >> nth=19`, sub.Support)
        await this.actions.enterElementText(`input >> nth=20`, sub.CMCTickerURL)
        await this.actions.enterElementText(`input >> nth=21`, sub.CGTickerURL)
        await this.actions.enterElementText(`input >> nth=22`, sub.LlamaTickerURL)
        await this.actions.clickElement(`text=Save`)
    }

    async createNewAdminSubmission(sub: SuperSubmission): Promise<void> {
        await this.actions.clickElement(`text=Create new`)
        await this.actions.clickElement(`input >> nth=0`)
        await this.actions.clickElement(`body >> section >> nth=5 >> text=${sub.ChainID} >> nth=1`)
        await this.actions.enterElementText(`input >> nth=1`, sub.TokenAddress)
        await this.actions.enterElementText(`input >> nth=2`, sub.BlockscoutUserEmail)
        await this.actions.enterElementText(`input >> nth=3`, sub.RequesterName)
        await this.actions.enterElementText(`input >> nth=4`, sub.RequesterEmail)
        await this.actions.enterElementText(`input >> nth=5`, sub.ProjectName)
        await this.actions.enterElementText(`input >> nth=6`, sub.ProjectWebSite)
        await this.actions.enterElementText(`input >> nth=7`, sub.ProjectEmail)
        await this.actions.enterElementText(`input >> nth=8`, sub.IconURL)
        await this.actions.enterElementText(`input >> nth=9`, sub.ProjectDescription)
        await this.actions.enterElementText(`input >> nth=10`, sub.ProjectSector)

        await this.actions.enterElementText(`input >> nth=11`, sub.Comment)
        await this.actions.enterElementText(`input >> nth=12`, sub.Docs)
        await this.actions.enterElementText(`input >> nth=13`, sub.Github)
        await this.actions.enterElementText(`input >> nth=14`, sub.Telegram)
        await this.actions.enterElementText(`input >> nth=15`, sub.Linkedin)
        await this.actions.enterElementText(`input >> nth=16`, sub.Discord)
        await this.actions.enterElementText(`input >> nth=17`, sub.Slack)
        await this.actions.enterElementText(`input >> nth=18`, sub.Twitter)
        await this.actions.enterElementText(`input >> nth=19`, sub.OpenSea)
        await this.actions.enterElementText(`input >> nth=20`, sub.Facebook)
        await this.actions.enterElementText(`input >> nth=21`, sub.Medium)
        await this.actions.enterElementText(`input >> nth=22`, sub.Reddit)
        await this.actions.enterElementText(`input >> nth=23`, sub.Support)
        await this.actions.enterElementText(`input >> nth=24`, sub.CMCTickerURL)
        await this.actions.enterElementText(`input >> nth=25`, sub.CGTickerURL)
        await this.actions.enterElementText(`input >> nth=26`, sub.LlamaTickerURL)
        await this.actions.clickElement(`text=Save`)
    }

    async login(login: string, password: string) {
        await this.actions.enterElementText(`input >> nth=0`, login)
        await this.actions.enterElementText(`input >> nth=1`, password)
        await this.actions.clickElement(`button >> nth=0`)
    }
}
