const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = 'c018d9cf21333806075a7c1f32a1bbecfe3f0eecbea3bcb52dd57f98fd2caaea'

module.exports = {
    networks: {
        kovan_arbitrum: {
            provider: function () {
                return wrapProvider(
                    new HDWalletProvider(mnemonic, 'https://kovan5.arbitrum.io/rpc')
                )
            },
            network_id: '',
            gasPrice: 0,
            gas: 50000000,
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
