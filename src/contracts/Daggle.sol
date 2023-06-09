// SPDX-License-Identifier: MITX
pragma solidity 0.8.18;

contract Daggle {
    address owner;
    mapping(address => uint256) public credits;

    constructor() {
        owner = msg.sender;
    }

    function buyCredits(uint256 _credits) external payable {
        uint256 total = 1 * _credits;
        require(msg.value == total * ( 1 ether), "Please send exact credits!");
        credits[msg.sender] += _credits;
    }

    function withDraw() external {
        require(msg.sender == owner, "Only owner can use this function!");
        (bool sent, ) = owner.call{value: address(this).balance}("");
        require(sent, "Unable to withdraw funds.");
    }
}