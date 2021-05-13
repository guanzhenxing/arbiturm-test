pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract BlockNumberTest {

    struct State {
        uint256 index;
        uint256 blockNumber;
        uint256 blockTime;
    }

    mapping(address => State) public userState;

    event Msg(uint256 index, uint256 blockNumber, uint256 blockTime);

    function initialize() public {

        address user = msg.sender;

        userState[user] = State({
        index : 0,
        blockNumber : block.number,
        blockTime : block.timestamp
        });

        emit Msg(userState[user].index, userState[user].blockNumber, userState[user].blockTime);
    }

    function getUserState() public view returns (State memory){
        State storage state = userState[msg.sender];
        return state;
    }

    function updateUserState() public {
        State storage state = userState[msg.sender];

        state.index = state.index + 1;
        state.blockNumber = block.number;
        state.blockTime = block.timestamp;

        emit Msg(state.index, state.blockNumber, state.blockTime);
    }

    function compareAndUpdateUserState() public {

        State storage state = userState[msg.sender];
        uint256 blockNumber = block.number;

        require(state.blockNumber <= blockNumber, "state.blockNumber must be smaller or equal to blockNumber");
        updateUserState();

        emit Msg(state.index, state.blockNumber, state.blockTime);
    }

    function getBlockDelta() public view returns (uint){
        uint currentBlockNumber = getBlockNumber();
        State storage state = userState[msg.sender];
        uint delta = sub(currentBlockNumber, state.blockNumber);

        return delta;
    }

    function getBlockNumber() public view returns (uint256){
        return block.number;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }

}
