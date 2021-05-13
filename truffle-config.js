const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = ''

module.exports = {
    networks: {
        kovan_arbitrum: {
            provider: function () {
                return wrapProvider(
                    new HDWalletProvider(mnemonic, 'https://kovan4.arbitrum.io/rpc')
                )
            },
            network_id: '212984383488152',
            gasPrice: 0,
            gas: 20000000,
            networkCheckTimeout: 7500
        },
    },
    compilers: {
        solc: {
            version: '0.6.12',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 1,
                },
            },
        },
    },
}
