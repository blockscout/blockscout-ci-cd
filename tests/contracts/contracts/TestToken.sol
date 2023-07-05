// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20, Ownable {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, 100 * 10 ** uint(decimals()));
    }

    function mint(address to, uint256 _amount) public {
        _mint(to, _amount * 10 ** uint(decimals()));
    }

    function alwaysReverts() external returns (bool) {
        require(false, "I'm always reverting with an error");
        return false;
    }
}
