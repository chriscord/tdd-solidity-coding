import { HelloWorld } from './../typechain-types/HelloWorld';
import { ethers } from "hardhat";


async function main() {
    const accounts = await ethers.getSigners();

    // Deconstruct the first three
    const [deployer, acc1, acc2] = accounts;
    console.log("Deploying contracts with the account:", deployer.address);

    const provider = ethers.provider;
    const lastBlock = await provider.getBlock("latest");
    // console.log("Last block in this network is \n");
    // console.log(lastBlock);

    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`Deployer balance: ${ethers.formatUnits(deployerBalance)} eth`);

    const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();

    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`HelloWorld smart contract address: ${helloWorldContractAddress}`);

    const helloWorldBytes = await helloWorldContract.helloWorld();
    const helloWorldText = ethers.decodeBytes32String(helloWorldBytes);
    console.log(`Text stored in the contract: ${helloWorldText}`);
}


// main();
main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})

