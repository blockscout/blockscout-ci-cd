/* eslint-disable import/prefer-default-export */
import { cleanEnv, str } from 'envalid'
import { ResourceMode } from './pkg/blockscout'

require(`dotenv`).config()

export const env = cleanEnv(process.env, {
    IMAGE: str(),
    NAMESPACE_NAME: str(),
    WALLET: str(),
    HTTP_URL: str(),
    WS_URL: str({}),
    VARIANT: str({ choices: [`geth`, `parity`] }),
    RESOURCE_MODE: str({ choices: Object.values(ResourceMode) }),
})
