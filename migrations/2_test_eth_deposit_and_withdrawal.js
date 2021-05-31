const {ethers} = require("ethers");

const EthDepositAndWithdrawal = artifacts.require("EthDepositAndWithdrawal")


module.exports = async function (deployer, network, accounts) {

    await deployer.deploy(EthDepositAndWithdrawal)
    let contract = await EthDepositAndWithdrawal.deployed()
    let address = contract.address
    let account = accounts[0]

    console.log("Contract address: ", contract.address)

    console.log("Before deposit balance: ", await web3.eth.getBalance(account))

    await testDeposit(account, address)

    console.log("After deposit balance: ", await web3.eth.getBalance(account))

    console.log("Before withdrawal balance: ", await web3.eth.getBalance(account))

    await testWithdrawal(account, address)

    console.log("After withdrawal balance: ", await web3.eth.getBalance(account))
};

async function testDeposit(account, address) {

    let instance = new web3.eth.Contract(EthDepositAndWithdrawal.abi, address);
    let tx = await instance.methods.deposit().send({
        from: account,
        value: "100000000000000000"
    })

    console.log(tx.transactionHash)

    console.log("balanceOf:", await instance.methods.balanceOf(account).call())

}

async function testWithdrawal(account, address) {

    let instance = new web3.eth.Contract(EthDepositAndWithdrawal.abi, address);
    let tx = await instance.methods.withdraw("100000000000000000").send({
        from: account,
    })

    console.log(tx.transactionHash)

    console.log("balanceOf:", await instance.methods.balanceOf(account).call())

}