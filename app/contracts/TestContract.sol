pragma solidity ^0.5.0;

contract TestContract {
    string private test_string;

    constructor() public {
        test_string = "neki fini test";
    }

    function setTest(string memory test) public {
        test_string = test;
    }  

    function getTest() public view returns(string memory) {
        return test_string;
    }
}