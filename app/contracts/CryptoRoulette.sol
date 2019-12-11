pragma solidity ^0.5.3;
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

    event SpinResultEvent (
        address indexed sender,
        bool won,
        uint256 amountWon,
        uint[] selectedItemID,
        uint selectedNumber
    );

    function placeBet(uint[] memory betIDs, uint[] memory bets) public payable {
        uint selectedNumber = wheelSpin();
        uint payoutAmount = calculatePayout(selectedNumber, betIDs, bets);
        if(payoutAmount != 0) {
            // transfers funds to winner
            msg.sender.transfer(payoutAmount);
        }
        Spin memory newSpin = Spin({
            time: block.timestamp,
            better: msg.sender,
            selectedItemID: betIDs,
            totalFundsPlaced: sumArray(bets),
            selectedNumber: selectedNumber,
            isWinningSpin: payoutAmount != 0
        });
        _lastSpins.push(newSpin);
        emit SpinResultEvent(msg.sender, payoutAmount != 0, payoutAmount, betIDs, selectedNumber);
    }

    function wheelSpin() public returns (uint) {
        // actually this function just generates random number
        uint _randomNumber = (uint(keccak256(abi.encodePacked(blockhash(block.number - 1), _lastSpinResults.length)))) % 36;
        _lastSpinResults.push(_randomNumber);
        return _randomNumber;
    }

    function sumArray(uint[] memory arrayToSum) public pure returns (uint _sum) {
        _sum = 0;
        for (uint i = 0; i < arrayToSum.length; i++) {
            _sum += arrayToSum[i];
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

    function payout() public onlyOwner payable {
        return msg.sender.transfer(address(this).balance);
    }

    function calculatePayout(uint spinResult, uint[] memory placedBetsID, uint[] memory bets)  private pure returns (uint) {
        // this function check whether array contains number, ie. if spinResult is among placed bets from user
        uint payout = 0;
        for(uint i = 0; i < placedBetsID.length; i++) {
            if(placedBetsID[i] == spinResult && placedBetsID[i] < 37) {
                payout += bets[i] * 36;
            }
            // rows 2to1
            else if(placedBetsID[i] == 37 && spinResult % 3 == 0){
                payout += bets[i] * 3;
            }
            else if(placedBetsID[i] == 38 && spinResult % 3 == 2) {
                payout += bets[i] * 3;
            }
            else if(placedBetsID[i] == 39 && spinResult % 3 == 1)  {
                payout += bets[i] * 3;
            }
            // cols => dozens
            else if(placedBetsID[i] == 40 && spinResult > 0 && spinResult < 13) {
                payout += bets[i] * 3;
            }
            else if(placedBetsID[i] == 41 && spinResult > 12 && spinResult < 25) {
                payout += bets[i] * 3;
            }
            else if(placedBetsID[i] == 42 && spinResult > 24) {
                payout += bets[i] * 3;
            }
            // low or high numbers
            else if(placedBetsID[i] == 43 && spinResult > 0 && spinResult < 19) {
                payout += bets[i] * 2;
            }
            else if(placedBetsID[i] == 48 && spinResult > 18) {
                payout += bets[i] * 2;
            }
            // odd or even numbers
            else if(placedBetsID[i] == 44 && spinResult % 2 == 0) {
               payout += bets[i] * 2;
            }
            else if(placedBetsID[i] == 47 && spinResult % 2 == 1) {
                payout += bets[i] * 2;
            }
            // red of black
            else if(placedBetsID[i] == 45 &&
                (spinResult % 2 == 1 && (spinResult > 0 && spinResult < 11 || spinResult > 18 && spinResult < 29) ||
                spinResult % 2 == 0 && (spinResult > 10 && spinResult < 19 || spinResult > 29))) {
                    payout += bets[i] * 2;
            }
            else if(placedBetsID[i] == 46 &&
                !(spinResult % 2 == 1 && (spinResult > 0 && spinResult < 11 || spinResult > 18 && spinResult < 29) ||
                spinResult % 2 == 0 && (spinResult > 10 && spinResult < 19 || spinResult > 29))){
                    payout += bets[i] * 2;
            }
        }
        return payout;
    }
}