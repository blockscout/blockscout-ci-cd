import { check, fail, group } from 'k6'
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { defaultSession, testData } from './common'

import { shoot } from './gun'

const session = defaultSession()

export const advfilter = () => {
    group(`/api/v2/advanced-filters`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter has failed`)
        }
    })
}

export const advfilterERC20 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-20`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-20`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter ERC-20`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter ERC-20 has failed!`)
        }
    })
}

export const advfilterERC721 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-721`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-721`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter ERC-721`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter ERC-721 has failed!`)
        }
    })
}

export const advfilterERC1155 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-1155`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-1155`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter ERC-1155`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter ERC-1155 has failed!`)
        }
    })
}

export const advfilterERC404 = () => {
    group(`/api/v2/advanced-filters?tx_types=ERC-404`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=ERC-404`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter ERC-404`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter ERC-404 has failed`)
        }
    })
}

export const advfilterCoinTransfer = () => {
    group(`/api/v2/advanced-filters?tx_types=coin_transfer`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?tx_types=coin_transfer`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter CoinTransfer`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter has failed!`)
        }
    })
}

export const advfilterMethodTransfer = () => {
    group(`/api/v2/advanced-filters?methods=0xa9059cbb`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xa9059cbb`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method transfer`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method transfer has failed!`)
        }
    })
}

export const advfilterMethodMint = () => {
    group(`/api/v2/advanced-filters?methods=0xa0712d68`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xa0712d68`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method mint`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method mint has failed!`)
        }
    })
}

export const advfilterMethodApprove = () => {
    group(`/api/v2/advanced-filters?methods=0x095ea7b3`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x095ea7b3`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method approve`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method approve has failed!`)
        }
    })
}

export const advfilterMethodBuy = () => {
    group(`/api/v2/advanced-filters?methods=0x40993b26`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x40993b26`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method buy`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method buy has failed!`)
        }
    })
}

export const advfilterMethodExecute = () => {
    group(`/api/v2/advanced-filters?methods=0x3593564c`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x3593564c`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method execute`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method execute has failed!`)
        }
    })
}

export const advfilterMethodWithdraw = () => {
    group(`/api/v2/advanced-filters?methods=0x3ccfd60b`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0x3ccfd60b`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method withdraw`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method withdraw has failed!`)
        }
    })
}

export const advfilterMethodDeposit = () => {
    group(`/api/v2/advanced-filters?methods=0xd0e30db0`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?methods=0xd0e30db0`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter method deposit`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter method deposit has failed!`)
        }
    })
}

export const advfilterAge7d = () => {
    group(`/api/v2/advanced-filters?age=7d`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?age=7d`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter age 7d`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter age 7d has failed!`)
        }
    })
}

export const advfilterAge1m = () => {
    group(`/api/v2/advanced-filters?age=1m`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?age=1m`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter age 1m`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter age 1m has failed!`)
        }
    })
}

export const advfilterAndRelation = () => {
    group(`/api/v2/advanced-filters?address_relation=and`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?address_relation=and`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter address relation`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter address relation has failed!`)
        }
    })
}

export const advfilterTo = () => {
    group(`/api/v2/advanced-filters?to_address_hashes_to_include=0x5e809A85Aa182A9921EDD10a4163745bb3e36284`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?to_address_hashes_to_include=0x5e809A85Aa182A9921EDD10a4163745bb3e36284`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter to`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter to has failed!`)
        }
    })
}
// from_address_hashes_to_include=0x1199E2a4cc6BFac09B491795f2eD4ce2854Fc8F5
export const advfilterFrom = () => {
    group(`/api/v2/advanced-filters?from_address_hashes_to_include=0x1199E2a4cc6BFac09B491795f2eD4ce2854Fc8F5`, () => {
        const res = shoot(session, {
            method: `GET`,
            url: `/api/v2/advanced-filters?from_address_hashes_to_include=0x1199E2a4cc6BFac09B491795f2eD4ce2854Fc8F5`,
            params: {
                headers: {
                },
                tags: {
                    name: `Advanced Tx Filter from`,
                },
            },
        })
        check(res, {
            'is status 200': (r) => r.status === 200,
        })
        if (res.status !== 200) {
            fail(`Advanced Tx Filter from has failed!`)
        }
    })
}
