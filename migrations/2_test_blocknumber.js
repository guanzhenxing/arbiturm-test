const {ethers} = require("ethers");

const BlockNumberTest = artifacts.require("BlockNumberTest")
const MockErc20 = artifacts.require("MockErc20")

module.exports = async function (deployer) {
    // await runBlockNumberTest(deployer)
    await testDeployErc20(deployer)
};

async function testDeployErc20(deployer){
    await deployer.deploy(MockErc20)
    let erc20 = await MockErc20.deployed()
    console.log("Contract address: ", erc20.address)
}

async function runBlockNumberTest(deployer) {
    console.log("\nrunBlockNumberTest...");

    await deployer.deploy(BlockNumberTest)
    let contract = await BlockNumberTest.deployed()
    console.log("Contract address: ", contract.address)

    console.log("getBlockNumber: ", await contract.getBlockNumber());  // Will return L2 blockNumber

    console.log("initialize: ", (await contract.initialize()).tx);

    console.log("getUserState 1: ", await contract.getUserState());

    console.log("updateUserState: ", (await contract.updateUserState()).tx);

    console.log("getUserState 2: ", await contract.getUserState());

    console.log("compareAndUpdateUserState: ", (await contract.compareAndUpdateUserState()).tx);

    console.log("getUserState 3: ", await contract.getUserState());

    console.log("BlockDelta: ", await contract.getBlockDelta());
}


