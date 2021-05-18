// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Copied and modified from SUSHI code:
// https://github.com/sushiswap/sushiswap/blob/master/contracts/SushiToken.sol
// WePiggyToken with Governance.
contract MockErc20 is ERC20, AccessControl {

    // Create a new role identifier for the minter role
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() public ERC20("MockCoin", "MC") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /// @notice Creates `_amount` token to `_to`.Must only be called by the minter role.
    function mint(address _to, uint256 _amount) public {

        // Check that the calling account has the minter role
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");

        _mint(_to, _amount);
    }


    function getChainId() internal pure returns (uint) {
        uint256 chainId;
        assembly {chainId := chainid()}
        return chainId;
    }


}