/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import { WebActions } from "@lib/WebActions"
import type { Page } from 'playwright'
import { CommonPage } from "./Common"

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

export class VerificationPage extends CommonPage {
    readonly page: Page

    actions: WebActions

    CONTRACT_NAME_INPUT = `[data-test="contract_name"]`

    NIGHTLY_BUILDS_RADIO = `#smart_contract_nightly_builds_true`

    COMPILER_VERSION_SELECT = `#smart_contract_compiler_version`

    EVM_VERSION_SELECT = `#smart_contract_evm_version`

    OPTIMISATIONS_OFF_RADIO = `#smart_contract_optimization_false`

    CODE = `#smart_contract_contract_source_code`

    FETCH_CONSTRUCTOR_ARGS_OFF_RADIO = `#smart_contract_autodetect_constructor_args_false`

    CONSTRUCTOR_ARGS_ABI_INPUT = `#smart_contract_constructor_arguments`

    SUBMIT = `[type="submit"] >> nth=2`

    constructor(page: Page) {
        super(page)
        this.page = page
        this.actions = new WebActions(this.page)
    }

    async open(addr: string): Promise<void> {
        await this.actions.navigateToURL(`address/${addr}/verify-via-flattened-code/new`)
    }

    async fillFlattenForm(form: VerificationFlattenForm): Promise<void> {
        await this.actions.enterElementText(this.CONTRACT_NAME_INPUT, form.contractName)
        if (form.nightlyBuilds) {
            await this.actions.clickElement(this.NIGHTLY_BUILDS_RADIO)
        }
        await this.actions.clickElement(this.COMPILER_VERSION_SELECT)
        await this.actions.clickElement(this.EVM_VERSION_SELECT)
        if (form.optimizationsOff) {
            await this.actions.clickElement(this.OPTIMISATIONS_OFF_RADIO)
        }
        await this.actions.enterElementText(this.CODE, form.code)
        if (form.fetchContstuctorArgsManually) {
            await this.actions.clickElement(this.FETCH_CONSTRUCTOR_ARGS_OFF_RADIO)
            await this.actions.enterElementText(this.CONSTRUCTOR_ARGS_ABI_INPUT, form.constructorArgs)
        }
        await this.actions.clickElement(this.SUBMIT)
    }
}
