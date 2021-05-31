pragma solidity 0.6.12;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract EthDepositAndWithdrawal is ERC20 {

    constructor() public ERC20("MockWETH", "MWETH"){
    }

    receive() external payable {
        _mint(msg.sender, msg.value);
        emit Transfer(address(0), msg.sender, msg.value);
    }

    function deposit() external payable {
        _mint(msg.sender, msg.value);
        emit Transfer(address(0), msg.sender, msg.value);
    }

    function depositTo(address to) external payable {
        _mint(to, msg.value);
        emit Transfer(address(0), to, msg.value);
    }

    function withdraw(uint256 value) external {
        uint256 balance = balanceOf(msg.sender);
        require(balance >= value, "burn amount exceeds balance");
        _burn(msg.sender, value);
        emit Transfer(msg.sender, address(0), value);

        // Way one
        //        (bool success,) = msg.sender.call{value : value}("");
        //        require(success, "ETH transfer failed");

        //Way Two
        msg.sender.transfer(value);

    }


    function withdrawTo(address payable to, uint256 value) external {
        uint256 balance = balanceOf(msg.sender);
        require(balance >= value, "burn amount exceeds balance");
        _burn(msg.sender, value);
        emit Transfer(msg.sender, address(0), value);

        // Way one
        //        (bool success,) = to.call{value : value}("");
        //        require(success, "ETH transfer failed");

        //Way Two
        to.transfer(value);

    }
}
