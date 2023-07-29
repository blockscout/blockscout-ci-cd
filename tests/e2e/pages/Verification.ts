/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import testConfig from "../testConfig"
import { CommonPage } from "./Common"

const { waitForVerification } = testConfig

export interface VerificationFlattenForm {
    contractName: string,
    nightlyBuilds?: boolean,
    compilerVersion: string,
    evmVersion: string,
    optimizationsOff?: boolean,
    code: string,
    fetchContstuctorArgsManually?: boolean,
    constructorArgs?: string,
}

export interface VerificationCodeInfo {
    contractNameText: string
    contractName: string
    compilerVersionText: string
    compilerVersion: string
    EVMVersionText: string
    EVMVersion: string
    optomizationEnabledText: string
    optomizationEnabled: string
    optimizationRunsText: string
    optimizationRuns: string
    verifiedAtText: string
    verifiedAt: string
    constructorArgsText: string
    codeConstructorArgs: string
    codeTokenName: string
    codeTokenSymbol: string
    contractSourceCodeText: string
    contractABIText: string
    deployedByteCodeText: string
}

export class VerificationPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    // CONTRACT_NAME_INPUT = `[data-test="contract_name"]`

    // NIGHTLY_BUILDS_RADIO = `#smart_contract_nightly_builds_true`

    // COMPILER_VERSION_SELECT = `#smart_contract_compiler_version`

    // EVM_VERSION_SELECT = `#smart_contract_evm_version`

    // OPTIMISATIONS_OFF_RADIO = `#smart_contract_optimization_false`

    // CODE = `#smart_contract_contract_source_code`

    // FETCH_CONSTRUCTOR_ARGS_OFF_RADIO = `#smart_contract_autodetect_constructor_args_false`

    // CONSTRUCTOR_ARGS_ABI_INPUT = `#smart_contract_constructor_arguments`

    // SUBMIT = `[type="submit"] >> nth=2`

    // CODE_BLOCK_SELECTED = `[class="card-tab active"]`

    // CODE_HEADER = `[class="card-body"] >> dl >> nth={} >> dt`

    SECTION = `section >> div >> nth=`

    SUMBIT = `text=Verify & Publish`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`address/${addr}/contract-verification`)
    }

    list_box(num: number, pos: number): string {
        return `#react-select-${num}-listbox >> div >> nth=${pos}`
    }

    async fillFlattenForm(form: VerificationFlattenForm): Promise<void> {
        await this.actions.clickElement(`${this.SECTION}8`)
        await this.actions.clickElement(this.list_box(2, 1))
        await this.actions.enterElementText(`${this.SECTION}12 >> input`, form.contractName)
        await this.actions.clickElement(`${this.SECTION}21`)
        await this.actions.clickElement(this.list_box(3, 4))
        await this.actions.clickElement(`${this.SECTION}28`)
        await this.actions.clickElement(this.list_box(4, 1))
        await this.actions.enterElementText(`${this.SECTION}43 >> textarea`, form.code)
        await this.actions.clickElement(this.SUMBIT)
    }

    // async fillFlattenForm(form: VerificationFlattenForm): Promise<void> {
    //     await this.actions.enterElementText(this.CONTRACT_NAME_INPUT, form.contractName)
    //     if (form.nightlyBuilds) {
    //         await this.actions.clickElement(this.NIGHTLY_BUILDS_RADIO)
    //     }
    //     await this.actions.clickElement(this.COMPILER_VERSION_SELECT)
    //     await this.actions.clickElement(this.EVM_VERSION_SELECT)
    //     if (form.optimizationsOff) {
    //         await this.actions.clickElement(this.OPTIMISATIONS_OFF_RADIO)
    //     }
    //     await this.actions.enterElementText(this.CODE, form.code)
    //     if (form.fetchContstuctorArgsManually) {
    //         await this.actions.clickElement(this.FETCH_CONSTRUCTOR_ARGS_OFF_RADIO)
    //         await this.actions.enterElementText(this.CONSTRUCTOR_ARGS_ABI_INPUT, form.constructorArgs)
    //     }
    //     await this.actions.clickElement(this.SUBMIT)
    // }

    // async checkCodePage(info: VerificationCodeInfo): Promise<void> {
    //     await this.actions.verifyElementIsDisplayed(this.CODE_BLOCK_SELECTED, `no code block is displayed after verification`, waitForVerification)
    //     await this.checkCodeHeader(info)
    //     await this.checkCodeBody(info)
    // }

    // async checkCodeHeader(info: VerificationCodeInfo): Promise<void> {
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=0 >> dt >> nth=0`, info.contractNameText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=0 >> dd >> nth=0`, info.contractName)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=1 >> dt >> nth=0`, info.compilerVersionText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=1 >> dd >> nth=0`, info.compilerVersion)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=2 >> dt >> nth=0`, info.EVMVersionText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=2 >> dd >> nth=0`, info.EVMVersion)

    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=0 >> dt >> nth=1`, info.optomizationEnabledText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=0 >> dd >> nth=1`, info.optomizationEnabled)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=1 >> dt >> nth=1`, info.optimizationRunsText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=1 >> dd >> nth=1`, info.optimizationRuns)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=2 >> dt >> nth=1`, info.verifiedAtText)
    //     await this.actions.verifyElementContainsText(`[class="card-body"] >> dl >> nth=2 >> dd >> nth=1`, info.verifiedAt)
    // }

    // async checkCodeBody(info: VerificationCodeInfo): Promise<void> {
    //     await this.actions.verifyElementContainsText(`section >> nth=2`, info.constructorArgsText)
    //     await this.actions.verifyElementContainsText(`section >> nth=2 >> code`, info.codeConstructorArgs)
    //     await this.actions.verifyElementContainsText(`section >> nth=2 >> code`, info.codeTokenName)
    //     await this.actions.verifyElementContainsText(`section >> nth=2 >> code`, info.codeTokenSymbol)

    //     await this.actions.verifyElementContainsText(`section >> nth=3 >> div >> h3`, info.contractSourceCodeText)
    //     await this.actions.verifyElementIsDisplayed(`text=Copy source code`, `no src code copy btn`)
    //     await this.actions.verifyElementContainsText(`section >> nth=4`, info.contractABIText)
    //     await this.actions.verifyElementIsDisplayed(`text=Copy ABI`, `no ABI copy btn`)
    //     await this.actions.verifyElementContainsText(`section >> nth=5`, info.deployedByteCodeText)
    //     await this.actions.verifyElementIsDisplayed(`text=Copy Deployed ByteCode`, `no ByteCode copy btn`)
    // }
}
