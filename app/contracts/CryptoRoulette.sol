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
        uint payoutAmount = calculatePayout(selectedNumber, betIDs, bets);
        if(payoutAmount != 0) {
            // transfers funds to winner
            msg.sender.transfer(payoutAmount);
        }
        Spin memory newSpin = Spin({
            time: now,
            better: msg.sender,
            selectedItemID: betIDs,
            totalFundsPlaced: sumArray(bets),
            selectedNumber: selectedNumber,
            isWinningSpin: payoutAmount != 0
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

    modifier minBet() {
        // minimum amount ether required for player to place bet
        require(msg.value == .01 ether, "Minimal ether required");
        _;
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
            // red
            else if(placedBetsID[i] == 45 && false) {
                payout += bets[i] * 2;
            }
            // black
            else if(placedBetsID[i] == 46 && false) {
                payout += bets[i] * 2;
            }
        }
        return payout;
    }
}