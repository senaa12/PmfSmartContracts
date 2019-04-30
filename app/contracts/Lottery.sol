pragma solidity ^0.5.0;

contract Lottery {
    struct Ticket {
        address _owner;
        uint256[] _nummbersSelected;
    }

    uint256 private _randomNumber;
    // Ticket[] private _tickets;

    constructor() public {
        _randomNumber = random();
    }

    function getTest() public view returns(uint256) {
        return _randomNumber;
    }

    function random() public returns (uint256) {
        _randomNumber = uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), _randomNumber, now)));
        return _randomNumber % 10; /* max vrijednost koja moze bit */
    }
}