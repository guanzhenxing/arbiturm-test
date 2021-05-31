const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'e02db203e8bb7ef86259645253d56f749df5b487d603ec045d669079f004d685'

module.exports = {
    networks: {
        kovan_arbitrum: {
            provider: function () {
                return wrapProvider(
                    new HDWalletProvider(mnemonic, 'https://kovan5.arbitrum.io/rpc')
                )
            },
            network_id: '144545313136048',
            gasPrice: 0,
            gas: 88888888,
            networkCheckTimeout: 7500
        },
    },
    compilers: {
        solc: {
            version: '0.6.12',
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200,
                },
            },
        },
    },
}
