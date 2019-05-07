pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CryptoRoulette {
    struct Spin {
        uint time;
        address better;
        uint[] selectedItemID;
        uint totalFundsPlaced;
        uint selectedNumber;
        bool isWinningSpin;
    }

    address private _contractOwner;
    function getContractOwner() public view returns (address) {
        return _contractOwner;
    }

    uint[] private _lastSpinResults;
    function getSpinResults() public view returns (uint[] memory) {
        return _lastSpinResults;
    }

    Spin[] private _lastSpins;
    function getLastSpins() public view returns (Spin[] memory){
        return _lastSpins;
    }

    constructor() public payable {
        _contractOwner = msg.sender;
    }

    function placeBet(uint[] memory betIDs, uint[] memory bets) public payable returns (Spin memory) {
        uint selectedNumber = wheelSpin();
        bool isWinningSpin = isWinner(selectedNumber, betIDs);
        if(isWinningSpin) {
            // transfers funds to winner
            msg.sender.transfer(calculateWinAmount(bets, selectedNumber));
        }
        Spin memory newSpin = Spin({
            time: now,
            better: msg.sender,
            selectedItemID: betIDs,
            totalFundsPlaced: sumArray(bets),
            selectedNumber: selectedNumber,
            isWinningSpin: isWinningSpin
        });
        _lastSpins.push(newSpin);
        return newSpin;
    }

    function wheelSpin() public returns (uint) {
        // actually this function just generates random number
        uint _randomNumber = (uint(keccak256(abi.encodePacked(blockhash(block.number - 1), _lastSpinResults.length, block.timestamp)))) % 36;
        _lastSpinResults.push(_randomNumber);
        return _randomNumber;
    }

    function isWinner(uint spinResult, uint[] memory placedBetsID)  private pure returns (bool) {
        // this function check whether array contains number, ie. if spinResult is among placed bets from user
        for(uint i = 0; i < placedBetsID.length; i++) {
            if(placedBetsID[i] == spinResult) {
                return true;
            }
        }
        return false;
    }

    function calculateWinAmount(uint[] memory placedBets, uint selectedNumber) private pure returns(uint) {
        // function calculates total win amount that contract needs to send to user who won the bet
        // TODO:
        uint _win = 4000000000000000000;
        return _win;
    }

    function sumArray(uint[] memory placedBets) private pure returns (uint _sum) {
        _sum = 0;
        for (uint i = 0; i < placedBets.length; i++) {
            _sum += placedBets[i];
        }
    }

    modifier onlyOwner() {
        // Ensure the participant awarding the ether is the manager
        require(
            msg.sender == _contractOwner,
            "Only Owner can see this func"
        );
        _;
    }

    function getBalance() public onlyOwner view returns(uint){
        // returns current balance of smart contract, notice this function is restricted to only contract owner
        return address(this).balance;
    }

    modifier minBet() {
        // minimum amount ether required for player to place bet
        require(msg.value == .01 ether, "Minimal ether required");
        _;
    }
}