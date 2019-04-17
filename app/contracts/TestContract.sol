pragma solidity ^0.5.0;

contract TestContract {
    uint private test;
    address private sender;

    constructor() public {
        test = 0;
    }

    function setTest(uint t) public {
        test = t;
        sender = msg.sender;
    }  

    function getTest() public view returns(uint) {
        return test;
    }

    function getSender() public view returns(address) {
        return sender;
    }
}