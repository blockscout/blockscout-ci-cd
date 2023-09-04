/* eslint-disable no-undef */
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.3/index.js'
import { RampingArrivalRateScenario, ConstantArrivalRateScenario, Scenario, PerVUIterationsScenario } from 'k6/options'

export const defaultSession = () => {
    const session = new Httpx({
        baseURL: __ENV.BASE_URL,
        headers: {
            'User-Agent': `K6 Load Testing Tool/1.0`,
        },
        timeout: __ENV.TIMEOUT, // milliseconds
    })

    session.addTags({
        apiType: `rpc`,
    })
    return session
}

export const defaultStressStages = {
    stages: [
        { target: 5, duration: `150s` },
        { target: 10, duration: `150s` },
        { target: 15, duration: `150s` },
        { target: 21, duration: `150s` },
    ],
}

// export const singleRequestSettings = {
//     executor: `constant-arrival-rate`,
// }

export const defaultAPITestSettings = {
    iterations: 1,
    executor: `constant-arrival-rate`,
    duration: `5m`,
    rate: 5,
}

export const defaultProfileStages = {
    stages: [
        { target: 3, duration: `30s` },
        { target: 3, duration: `30m` },
    ],
}

export const defaultThresholds = {
    http_req_failed: [`rate<0.01`], // http errors should be less than 1%
    http_req_duration: [`p(95)<20000`], // 95% of requests should be below 20s, just for CI debug for now
}

export const defaultScenarioSettings = {
    gracefulStop: `30s`,
    timeUnit: `1s`,
    preAllocatedVUs: 40,
    maxVUs: 500,
} as Scenario

export const options = {
    iterations: 1,
}

// goerli
export const defaultTestData = {
    APIKey: __ENV.API_KEY,
    blocks: [
        8386018,
        8386017,
        8386016,
        8386015,
        8386014,
        8386013,
        8386012,
        8386011,
        8386010,
        8386009,
        8386008,
        8386007,
        8386006,
        8386005,
        8386004,
        8386003,
        8386002,
        8386001,
        8386000,
        8385999,
        8385998,
        8385997,
        8385996,
        8385995,
        8385994,
        8385993,
        8385992,
        8385991,
        8385990,
        8385989,
        8385988,
        8385987,
        8385986,
        8385985,
        8385984,
        8385983,
        8385982,
        8385981,
        8385980,
        8385979,
        8385978,
        8385977,
        8385976,
        8385975,
        8385974,
        8385973,
        8385972,
        8385971,
        8385970,
        8385969,
    ],
    tokens: [
        `0x38a140c905dF5A5df117b65CE792D75d78b6Ff98`,
        `0x2aC3c1d3e24b45c6C310534Bc2Dd84B5ed576335`,
        `0x7753cfAD258eFbC52A9A1452e42fFbce9bE486cb`,
        `0xf74a5ca65E4552CfF0f13b116113cCb493c580C5`,
        `0x62BC478FFC429161115A6E4090f819CE5C50A5d9`,
        `0xCc7bb2D219A0FC08033E130629C2B854b7bA9195`,
        `0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6`,
        `0x07865c6E87B9F70255377e024ace6630C1Eaa37F`,
        `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`,
        `0x15987A0417D14cc6f3554166bCB4A590f6891B18`,
        `0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4`,
        `0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b`,
        `0x5C221E77624690fff6dd741493D735a17716c26B`,
        `0x317a8Fe0f1C7102e7674aB231441E485c64c178A`,
        `0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00`,
        `0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc`,
        `0x499d11E0b6eAC7c0593d8Fb292DCBbF815Fb29Ae`,
        `0x3151B7Dd9F6e806D2709153765925c373af47089`,
        `0xCA063A2AB07491eE991dCecb456D1265f842b568`,
        `0xA2475490B31C0133CF3850AA88896C5546d42A1C`,
        `0x38a140c905dF5A5df117b65CE792D75d78b6Ff98`,
        `0x45485A990D12a8EC13DB13cf7835609e429F5cfD`,
        `0xa96eDcDc32d188F0E6B2f4c25735a4279b6a3f21`,
        `0xA79F16C012909E91C87Ae36B2b6B56D7AE567043`,
        `0x39c1625df495f2bE319825EE11EA9D49Ab24d3bf`,
        `0x59105441977ecD9d805A4f5b060E34676F50F806`,
        `0xA39a87e2139dD2fc52194e668c69fa3e2C2342a6`,
        `0x3264Ef38E06D669aB1a5CedE857CF1C171323F2f`,
        `0x389E749bf12c864814a2Ea94Ea92B95833B475ed`,
        `0x63bfb2118771bd0da7A6936667A7BB705A06c1bA`,
        `0xC93c704dCB45a70D6DA1011FfA48B3D5185201E0`,
        `0xa3C0aB306Bcc7b7d67E845cA1d45B719a48EfdAa`,
        `0xc58af6BFaeA2F559085b75E4EccA913B015D93a4`,
        `0xEA01059f654872F7c58843b291f9ab7CA76F6BFe`,
        `0x8d96243E6A42AAdB32eD3552EEB159507110FABB`,
        `0x13C508F22F279F2EB414b5607F9EEF263AFda9Fe`,
        `0xb0f7554a44cC178e935Ea10c79e7c042D1840044`,
        `0xaF7f7d3bC41dc0ab220De52B91ebeB5D48E9f4c7`,
        `0x024f245F740667fF208068d593E4C7f8f26416f2`,
        `0x0D1a602FFaE312379caD1c32D586dC8B5f0f6CED`,
        `0xFEFf8081fED38467265327F19C321Af4B8Df1f0d`,
        `0xd787Ec2b6C962f611300175603741Db8438674a0`,
        `0xaa7B0C9CAb7051791d9e2F4728735924B60164a4`,
        `0x0Aa78575E17Ac357294Bb7B5a9ea512bA07669E2`,
        `0x77baa6A171e5084A9e7683B1F6658Bf330bf0011`,
        `0x4B57f6593C3965c8F966Db1Ea2797C5da3b74AbA`,
        `0x5a94Dc6cc85fdA49d8E9A8b85DDE8629025C42be`,
        `0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844`,
        `0x10A93994Cb6C080Ba72A8C03a87644310E3c1d6e`,
        `0x47a4357315e1d3AB3294c161c3a52e8b0d3A4109`,
        `0x708415d42f977E252bf787D1e9D71b1fD0F88171`,
    ],
    addresses: [
        `0xC48E23C5F6e1eA0BaEf6530734edC3968f79Af2e`,
        `0xe0a2Bd4258D2768837BAa26A28fE71Dc079f84c7`,
        `0x64631b5d259eAD889E8B06D12C8B74742804E5F1`,
        `0xff50ed3d0ec03aC01D4C79aAd74928BFF48a7b2b`,
        `0x9d525E28Fe5830eE92d7Aa799c4D21590567B595`,
        `0x1464D4e3c815dE3028572b850C6c34DFc57E9320`,
        `0x07b39F4fDE4A38bACe212b546dAc87C58DfE3fDC`,
        `0x2c539a95d2a3f9b10681D9c0dD7cCE37D40c7B79`,
        `0x462396E69dBfa455F405f4DD82F3014Af8003B72`,
        `0x59b0d71688da01057C08e4C1BAa8fAa629819C2a`,
        `0x46A341c63Da91F49788972e2FEa63181771669Ce`,
        `0xd3C53d11b7E341F19AAB4E950Cee12E664Bbb37A`,
        `0x88072DACc5ad5DE87214F0dba0760f66C0C1B53d`,
        `0x8c5fecdC472E27Bc447696F431E425D02dd46a8c`,
        `0x00040BF2d531A7164a751b361074F15DCcB80000`,
        `0xc638f625aC0369d56D55106affbD5b83872Db971`,
        `0xecBBc62189B18902e9ABE7236eDfA7964F7E3381`,
        `0x3806E26Cc275E8922b92B1264505Fe345113Afc2`,
        `0x34aA3F359A9D614239015126635CE7732c18fDF3`,
        `0xFf90F906c1EEB5796bED659DDAeDf3935A9121f2`,
        `0x70F264A331a9C3B3248537aCf2470D963be741e3`,
        `0x0039F22efB07A647557C7C5d17854CFD6D489eF3`,
        `0x15F975952471083794791F0e0C819E6594bC5345`,
        `0xD8Ea779b8FFC1096CA422D40588C4c0641709890`,
        `0xD151e81C753f8baebA0505561648bC89Cfa97E12`,
        `0x2e840Df4F5042A419e2E09fba582359E1E46599b`,
        `0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6`,
        `0x75cf915Fe0A5727eF5befCb117F7659f02e64a1C`,
        `0x5df53F6133b9AB5C3BdBD043E75eD82191F7932c`,
        `0x71e5cb4245Cc3B70dA56ABd91E6e8421fa3cE282`,
        `0x272Dd1Ff68461DFa848c9C30D8E2C3180A8F18De`,
        `0x4e148970d546a1c023064C2f8775DA624167EE32`,
        `0xf36F155486299eCAff2D4F5160ed5114C1f66000`,
        `0x745bCE0D540AbE9cB639b6eACb5f6Ded3Cf947C9`,
        `0x3b86356F3Ed7CE7453b817b5Edb11B7Be8d2DfaA`,
        `0x2f14582947E292a2eCd20C430B46f2d27CFE213c`,
        `0x08C31473A219F22922F47f001611d8bac62fBB6d`,
        `0x16e82D77882A663454Ef92806b7DeCa1D394810f`,
        `0x599b932Ed6c71ab6ec82b47B6ee0d5Ce191fC6fe`,
        `0x48B597F4b53C21B48AD95c7256B49D1779Bd5890`,
        `0x99F0Ec06548b086E46Cb0019C78D0b9b9F36cD53`,
        `0xF5794543CF6055Ae710E9c8E99E31343Cea004a8`,
        `0x16cC248E24B9883C5d6FBb21646fA0C27Cb599F4`,
        `0xBeEfd32838D5762fF55395a7BeebEf6e8528c64F`,
        `0xccB040A1Ef49b14615325D8088905E97A341f40C`,
        `0xc24215226336d22238a20A72f8E489c005B44C4A`,
        `0x316d711d304B885C82400a4CD872e4Ac79BC013c`,
        `0x81b7E08F65Bdf5648606c89998A9CC8164397647`,
        `0x04f67C6fA446486D8Da0A3534566Bdc75Ef67004`,
        `0xa6DD2974B96e959F2c8930024451a30aFEC24203`,
    ],
    contracts: [
        `0xf74a5ca65E4552CfF0f13b116113cCb493c580C5`,
        `0x7753cfAD258eFbC52A9A1452e42fFbce9bE486cb`,
        `0x62BC478FFC429161115A6E4090f819CE5C50A5d9`,
        `0xCc7bb2D219A0FC08033E130629C2B854b7bA9195`,
        `0x07865c6E87B9F70255377e024ace6630C1Eaa37F`,
        `0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6`,
        `0x326C977E6efc84E512bB9C30f76E30c160eD06FB`,
        `0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b`,
        `0xd35CCeEAD182dcee0F148EbaC9447DA2c4D449c4`,
        `0x5C221E77624690fff6dd741493D735a17716c26B`,
        `0xEC3a9c7d612E0E0326e70D97c9310A5f57f9Af9E`,
        `0x15987A0417D14cc6f3554166bCB4A590f6891B18`,
        `0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc`,
        `0x317a8Fe0f1C7102e7674aB231441E485c64c178A`,
        `0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00`,
        `0x3151B7Dd9F6e806D2709153765925c373af47089`,
        `0x63bfb2118771bd0da7A6936667A7BB705A06c1bA`,
    ],
    txs: [
        `0x9d972592be32cea2dd335b75320fd171db42c86bef820305b4e682d760309adf`,
        `0xdc77dd8a723668853d380f3de1d3321732058b37d63c6c8c05015f0e870351b3`,
        `0x6e6136277bd3beb0efe9d15f68ebca99695298704b951a84cd35ba65fb6ad29f`,
        `0xec05b0ef8183bfd62f6e40cdb89902f2beac120cf9f820c419b732ad38557b99`,
        `0x93b5723051a4382056e94c8ca3e95d3dc501276e1af6b0229cbaf8ed200adb82`,
        `0xad7ce4e3eaf118f9ad8f4f415dd473afda0dd6f20544d392f1c7ba277c56c85a`,
        `0x24e3923291896d3327c4d227e7f070ea8177e10d40cad879b71c4b368274aeef`,
        `0x09d17e30a9794f6058233358b11ce32cd2a8d5a47f618848872bacd29063755f`,
        `0x9cd0472a088e007e0232c20e6ab4d55e76f28329077ecd1022130a369737eaea`,
        `0x3e3f90f036654a42240021ef7e73edbb4328ad56b1adf6bcc75da0e3bfedcaac`,
        `0x4a717201a5c25496298d052e492b8a1399828af24570afadef4502f7f91fe016`,
        `0x3f033dd95c4494b25a18867ffe381641fb67c98265fc797817b3404a850f7269`,
        `0xb3687e8a20984e620c4af609d5ce1c0d9fe19e59cbcd8e10ca6450221b1405dc`,
        `0x455a7f536d17fb13ed21565018f08bf4a1b9dbf5fe828e90e46a2a1de5d5b91c`,
        `0x7481400be57e8be97823eacb516c3a60459c9161a707ff7fcad746bd44419b0e`,
        `0x1f1a09f111824cebe08a35bb88e23ecb588ff8a9b13e7f558fad95dfc69b6d00`,
        `0x0ab6096b6b3a27d7ff8a889990e2d4bc097a36fb81994b5d245e4235c2408052`,
        `0x594580f110b2fdcd9c0998dd077b48302440997e82f677f061b6248d754a2831`,
        `0x2251b2b21fd3743efbbe3e45f5abbda358e6c7605ee6e34c9840ade965bd9ace`,
        `0xdacfa4967484a0c52277d525ffc7b3daa58c7d722218279a094b1f1d244566a4`,
        `0xd87b3744550394cd3b1cf323105775406b48e3fea79363271837b3fb5f8c3cad`,
        `0x6116d9f35f45a79f70d5abf1a7ff17513d0090e27409af10475fb18cf58f9298`,
        `0x50f8c05fdd7b8720cadbbabaf03120dd579c6c4f9e6141a014196da2f673cccf`,
        `0x7bbcd7799f4a2649ccd1f4971b706850f80f2754e0aed75300a99762ef66d079`,
        `0x431e67698e4572b3be24fdb0b192ec75d8be8f525498c8d77e193d5fc9ca049d`,
        `0x35f7698c70e8ee51c94824e0eff22a03e1bd29ae7183bb54c5ff724e3f672a5c`,
        `0xc77eb4bb3f1f99a295721063e5aa6ad7ada7e3e13e115e7e83878d9e631ae8bb`,
        `0xcbf22f1a5799cad07afbcd69458860f0fffc7874314b243ae2af4bc4eacd5bfe`,
        `0x9425114fe57d331dc3f08280c8b7822c5750a7c86e11d14a6f4f93e177812bfa`,
        `0x6d24a1adaff55c1f5de51e4491f493e12ea7dd6aa4912306d6e9dc468a4a3e99`,
        `0xee32f23833c382e59ef9a682a958a342bb7eeeb5019b5b44901c10c84e8646ae`,
        `0x5f99071c2ca1d9a5fa4f03280ac51b3f952bdfd08b4aa471b720ecd7a42a0b4b`,
        `0xb84166caf7c0415424becc5066971e887fe73c5980cd493fcaca21e24de073fd`,
        `0x349108bfd0a9748291e9134c047906bb1cfe2d11c1464108e2683ce5c7ea40ac`,
        `0x54d333e8d901f85be1373b78ca0f5481b6edf78413b152393f6813acc61998c3`,
        `0x979fbf5f95f678cd75ba5f52475c2dcf247832354efb4f6f560cbc855ae09d85`,
        `0x0a8d8177079f01595c627b99545ba7493d68b0bef76fffc56aba8ceafa3d5beb`,
        `0xdbac966efdc90c0cb8bbf594abd990b903e0533d201064c2fe2371fc79aac62c`,
        `0xb078d4a734d884e245c9eb8b4de60d9ba0df18103d19a6b3416bb106e20db3ed`,
        `0x77da23ba34e718151eef1ea74874108931bf47bafe69012aa3728a99f9c2f4c3`,
        `0xef59dedef881f5dee25ad42d9224cdc803f494fbc96d15c16146e39f6487654a`,
        `0x420e846366eb853afaf8a768543f9754da60fdc4b2b8746d1461e5bfe247e6ac`,
        `0x230b287877a1bc94c983c7f120d65c812aa8734b78c7fb43850229fdce92a89b`,
        `0x5edf770e4ec239d51f9b50ef8421b8a09cd23c0a7a5a6203be35e5e77499491f`,
        `0x7cef1682c9219ba0f2e52b965d34591565bfd8e9fe0e521c6dce1a5df3f298ee`,
        `0x61f2fbc5b68490671a73201e394590cec8ee9e35d2fb8511be77c744431ecb78`,
        `0x4aa7229949ff13410775865acca9081640dffb72128200a7a1f61bf48b0d4d4c`,
        `0xd4eca736e1997cb4268c809605a9ba4ad2bbf0d4fa9ab3f08d052a32a308063f`,
        `0xddf7f4791a723e229f70c9c6e16ea015da23140102299ed61fed6ccb3ac95759`,
        `0x84d7ed641ae1482641c5f107800887101f16bb1e02ee0c18fdc10c7b034ab43d`,
    ],
    pagination: {
        pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        offsets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
}

export const selectScenario = (scenarioName: string): { [name: string]: Scenario } => {
    switch (scenarioName) {
    case `stressBackendV2`:
        return {
            // jsonrpcurl: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2JSONRPCURL`,
            // } as PerVUIterationsScenario,
            // backendVersion: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2BackendVersion`,
            //     // startTime: `30s`,
            // } as PerVUIterationsScenario,
            addressesCounters: {
                iterations: 10000,
                vus: 1,
                executor: `per-vu-iterations`,
                exec: `backendV2AddressesTabCounters`,
                // startTime: `60s`,
            } as PerVUIterationsScenario,
            // addresses: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2Addresses`,
            //     // startTime: `60s`,
            // } as PerVUIterationsScenario,
            // transactions: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2Transactions`,
            //     // startTime: `90s`,
            // } as PerVUIterationsScenario,
            // txTokenTransfers: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TXTokenTransfers`,
            //     // startTime: `120s`,
            // } as PerVUIterationsScenario,
            // txInternal: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TXInternal`,
            //     // startTime: `150s`,
            // } as PerVUIterationsScenario,
            // txLogs: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TXLogs`,
            //     // startTime: `180s`,
            // } as PerVUIterationsScenario,
            // txRawTrace: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TXRawTrace`,
            //     // startTime: `210s`,
            // } as PerVUIterationsScenario,
            // txStateChanges: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TXStateChanges`,
            //     // startTime: `240s`,
            // } as PerVUIterationsScenario,
            // tokens: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2Tokens`,
            //     // startTime: `270s`,
            // } as PerVUIterationsScenario,
            // tokenInstances: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2TokenInstances`,
            //     // startTime: `300s`,
            // } as PerVUIterationsScenario,
            // smartContracts: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2SmartContracts`,
            //     // startTime: `330s`,
            // } as PerVUIterationsScenario,
            // smartContractsVerConfig: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2SmartContractsVerificationConfig`,
            //     // startTime: `360s`,
            // } as PerVUIterationsScenario,
            // blocks: {
            //     iterations: 300,
            //     vus: 1,
            //     executor: `per-vu-iterations`,
            //     exec: `backendV2Blocks`,
            //     // startTime: `390s`,
            // } as PerVUIterationsScenario,
        }
    case `stressBackend`:
        return {
            addressHash: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendAccountAddressHash`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            addressBalance: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendAddressBalance`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            ETHSupply: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendETHSupply`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenSupply: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendTokenSupply`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            getToken: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendGetToken`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            getTokenHolders: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendGetTokenHolders`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenBalance: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `backendTokenBalance`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            // disabled due to getLogs bug
            // getLogs: {
            //     ...defaultScenarioSettings,
            //     ...defaultStressStages,
            //     exec: `backendGetLogs`,
            //     executor: `ramping-arrival-rate`,
            // } as RampingArrivalRateScenario,
        }
    case `stressFrontend`:
        return {
            blocks: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendBlocks`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            blocksDetails: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendBlockDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            txs: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendTxs`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            txDetails: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendTxDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            addressDetails: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendAddressDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenDetails: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendTokenDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenHoldersDetails: {
                ...defaultScenarioSettings,
                ...defaultStressStages,
                exec: `frontendTokenHoldersDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
        }
    case `baseline`:
        return {
        // all goes sequential to receive release baseline metrics
            coldBlocks: {
                ...defaultScenarioSettings,
                ...defaultAPITestSettings,
                exec: `blocksByAddrPerfBaseline`,
                startTime: `0s`,
            } as ConstantArrivalRateScenario,
        }
    case `profile`:
        return {
            blocks: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendBlocks`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            blocksDetails: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendBlockDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            txs: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendTxs`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            txDetails: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendTxDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            addressDetails: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendAddressDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenDetails: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendTokenDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
            tokenHoldersDetails: {
                ...defaultScenarioSettings,
                ...defaultProfileStages,
                exec: `frontendTokenHoldersDetails`,
                executor: `ramping-arrival-rate`,
            } as RampingArrivalRateScenario,
        }
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}

export const selectTestData = (scenarioName: string) => {
    switch (scenarioName) {
    case `stressFrontend`:
        return defaultTestData
    case `stressBackendV2`:
        return defaultTestData
    case `stressBackend`:
        return defaultTestData
    case `baseline`:
        return defaultTestData
    case `profile`:
        return defaultTestData
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}

export const selectThresholds = (scenarioName: string) => {
    switch (scenarioName) {
    case `stressFrontend`:
        return defaultThresholds
    case `stressBackendV2`:
        return defaultThresholds
    case `stressBackend`:
        return defaultThresholds
    case `baseline`:
        return defaultThresholds
    case `profile`:
        return defaultThresholds
    default:
        throw Error(`no such scenario: ${scenarioName}`)
    }
}
