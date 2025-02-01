import { check, group } from 'k6'
import { defaultSession } from './common/common.js'

import { shoot } from './common/gun.js'
import {
    check200, p1, sane, t30,
} from "./common/profile.js"

const session = defaultSession()

export const options = {
    scenarios: {
        af: Object.assign({}, p1, { exec: `af` }),
        afFrom: Object.assign({}, p1, { exec: `afFrom` }),
        afTo: Object.assign({}, p1, { exec: `afTo` }),
        afAge7d: Object.assign({}, p1, { exec: `afAge7d` }),
        afAge1m: Object.assign({}, p1, { exec: `afAge1m` }),
        afERC20: Object.assign({}, p1, { exec: `afERC20` }),
        afERC721: Object.assign({}, p1, { exec: `afERC721` }),
        afERC1155: Object.assign({}, p1, { exec: `afERC1155` }),
        afERC404: Object.assign({}, p1, { exec: `afERC404` }),
        afCoinTransfer: Object.assign({}, p1, { exec: `afCoinTransfer` }),
        afMethodTransfer: Object.assign({}, p1, { exec: `afMethodTransfer` }),
        afMethodMint: Object.assign({}, p1, { exec: `afMethodMint` }),
        afMethodApprove: Object.assign({}, p1, { exec: `afMethodApprove` }),
        afMethodBuy: Object.assign({}, p1, { exec: `afMethodBuy` }),
        afMethodExecute: Object.assign({}, p1, { exec: `afMethodExecute` }),
        afMethodWithdraw: Object.assign({}, p1, { exec: `afMethodWithdraw` }),
        afMethodDeposit: Object.assign({}, p1, { exec: `afMethodDeposit` }),
    },
    thresholds: sane,
}

export const af = () => {
    group(`/api/v2/advanced-filters`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters`,
            params: {
                tags: {
                    name: `Advanced Tx Filter`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afERC20 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-20`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-20`,
            params: {
                tags: {
                    name: `Advanced Tx Filter ERC-20`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afERC721 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-721`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-721`,
            params: {
                tags: {
                    name: `Advanced Tx Filter ERC-721`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afERC1155 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-1155`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-1155`,
            params: {
                tags: {
                    name: `Advanced Tx Filter ERC-1155`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afERC404 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-404`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-404`,
            params: {
                tags: {
                    name: `Advanced Tx Filter ERC-404`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afCoinTransfer = () => {
    group(`/api/v2/advanced-filters?tx_types=coin_transfer`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=coin_transfer`,
            params: {
                tags: {
                    name: `Advanced Tx Filter CoinTransfer`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodTransfer = () => {
    group(`/api/v2/advanced-filters?methods=0xa9059cbb`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xa9059cbb`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method transfer`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodMint = () => {
    group(`/api/v2/advanced-filters?methods=0xa0712d68`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xa0712d68`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method mint`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodApprove = () => {
    group(`/api/v2/advanced-filters?methods=0x095ea7b3`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x095ea7b3`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method approve`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodBuy = () => {
    group(`/api/v2/advanced-filters?methods=0x40993b26`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x40993b26`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method buy`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodExecute = () => {
    group(`/api/v2/advanced-filters?methods=0x3593564c`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x3593564c`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method execute`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodWithdraw = () => {
    group(`/api/v2/advanced-filters?methods=0x3ccfd60b`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x3ccfd60b`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method withdraw`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afMethodDeposit = () => {
    group(`/api/v2/advanced-filters?methods=0xd0e30db0`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xd0e30db0`,
            params: {
                tags: {
                    name: `Advanced Tx Filter method deposit`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afAge7d = () => {
    group(`/api/v2/advanced-filters?age=7d`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?age=7d`,
            params: {
                tags: {
                    name: `Advanced Tx Filter age 7d`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afAge1m = () => {
    group(`/api/v2/advanced-filters?age=1m`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?age=1m`,
            params: {
                tags: {
                    name: `Advanced Tx Filter age 1m`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afAndRelation = () => {
    group(`/api/v2/advanced-filters?address_relation=and`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?address_relation=and`,
            params: {
                tags: {
                    name: `Advanced Tx Filter address relation`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}

export const afTo = () => {
    group(`/api/v2/advanced-filters?to_address_hashes_to_include=0x5e809A85Aa182A9921EDD10a4163745bb3e36284`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?to_address_hashes_to_include=0x5e809A85Aa182A9921EDD10a4163745bb3e36284`,
            params: {
                tags: {
                    name: `Advanced Tx Filter to`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
export const afFrom = () => {
    group(`/api/v2/advanced-filters?from_address_hashes_to_include=0x1199E2a4cc6BFac09B491795f2eD4ce2854Fc8F5`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?from_address_hashes_to_include=0x1199E2a4cc6BFac09B491795f2eD4ce2854Fc8F5`,
            params: {
                tags: {
                    name: `Advanced Tx Filter from`,
                },
                timeout: t30,
            },
        })
        check(res, check200)
    })
}
