// SPDX-License-Identifier: MIT
pragma solidity 0.8.19; // Latest

contract HelloWorld {
    bytes32 text; // This will remain on blockchain forever
    address public owner; // This is the actual owner address of HelloWorld contract (deployed in HardHat VM env)

    constructor() {
        text = bytes32("Hello World!");
        owner = msg.sender;
    }

    function helloWorld() external view returns (bytes32) {
        require(msg.sender == owner, "Caller is not the owner");
        return text;
    }

    function transferOwnership(address newOwner) external {
        require(msg.sender == owner, "Caller is not the owner");
        owner = newOwner;
    }

    function setText(bytes32 newText) external {
        require(msg.sender == owner, "Caller is not the owner");
        text = newText;
    }
}






