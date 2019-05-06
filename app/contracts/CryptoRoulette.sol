pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract CryptoRoulette {
    struct Spin {
        address _better;
        uint[] _selectedItemID;
        uint _totalFundsPlaced;
        uint _winingNumber;
        bool _isWinningTicket;
    }

    address private _contractOwner;
    uint private _contractFunds;
    
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
        _contractFunds = msg.value;
    }

    function placeBet(uint[] memory betIDs, uint[] memory bets) public payable returns (Spin memory) {
        uint spinResult = wheelSpin();
        bool isWinningTicket = isWinner(spinResult, betIDs);
        Spin memory newSpin = Spin({
            _better: msg.sender,
            _selectedItemID: betIDs,
            _totalFundsPlaced: sumArray(bets), 
            _winingNumber: spinResult,
            _isWinningTicket: isWinningTicket
        });
        _lastSpins.push(newSpin);
        return newSpin;
    }

    function wheelSpin() public returns (uint) {
        // actually this function just generates random number
        uint _randomNumber = (uint(keccak256(abi.encodePacked(blockhash(block.number - 1), _lastSpinResults.length, now)))) % 36;
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

    function sumArray(uint[] memory placedBets) private pure returns (uint _sum) {
        _sum = 0;
        for (uint i = 0; i < placedBets.length; i++) {
            _sum += placedBets[i];
        }
    }

    modifier restricted() {
        // Ensure the participant awarding the ether is the manager
        require(msg.sender == _contractOwner);
        _;
    }

    modifier minBet() {
        // minimum amount ether required for player to place bet
        require(msg.value == .01 ether);
        _;
    }
}