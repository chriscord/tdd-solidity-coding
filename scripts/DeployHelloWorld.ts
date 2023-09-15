import { HelloWorld } from './../typechain-types/HelloWorld';
// import { ethers } from "hardhat";
import { ethers } from "ethers";
// require("dotenv").config();
import 'dotenv/config'
import { HelloWorld__factory } from '../typechain-types';

async function main() {
    const rpcUrl = process.env.RPC_URL;
    if (!rpcUrl) throw new Error("RPC_URL is not set. Please set it in a .env file");
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    // const provider = ethers.provider;
    
    const lastBlock = await provider.getBlock("latest");
    // console.log("Last block in this network is \n");
    // console.log(lastBlock);
    

    // Get key and create wallet instance
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey || privateKey.length != 64) throw new Error("Private Key is invalid. Please set your PRIVATE_KEY in a .env file");
    console.log(privateKey?.length);

    const deployer = new ethers.Wallet(privateKey, provider);

    // Test with hardhat ethers
    // const accounts = await ethers.getSigners();
    // Deconstruct the first three
    // const [deployer, acc1, acc2] = accounts;
    console.log("Deploying contracts with the account:", deployer.address);

    // Test first
    const deployerBalance = await provider.getBalance(deployer.address);
    console.log(`Deployer balance Before: ${ethers.formatUnits(deployerBalance)} BNB`);

    const helloWorldFactory = new HelloWorld__factory(deployer);
    // const helloWorldFactory = await ethers.getContractFactory("HelloWorld");

    const helloWorldContract = await helloWorldFactory.deploy();
    await helloWorldContract.waitForDeployment();

    const helloWorldContractAddress = await helloWorldContract.getAddress();
    console.log(`HelloWorld smart contract address: ${helloWorldContractAddress}`);

    const helloWorldBytes = await helloWorldContract.helloWorld();
    const helloWorldText = ethers.decodeBytes32String(helloWorldBytes);
    console.log(`Text stored in the contract: ${helloWorldText}`);

    // Test again
    console.log(`Deployer balance After: ${ethers.formatUnits(await provider.getBalance(deployer.address))} BNB`)
}


// main();
main().catch((err) => {
    console.log(err);
    process.exitCode = 1;
})

