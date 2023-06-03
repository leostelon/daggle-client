// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ThetaTube is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    address payable public creator;
    uint256 public price;

    constructor(string memory name, string memory symbol, uint256 _price, address _creator) ERC721(name, symbol) {
        price = _price;
        creator = payable(_creator);
    }

    function safeMint() public payable {
        require(msg.value >= price, "Please send subscription price.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        bool sent = creator.send(msg.value);
        require(sent, "Failed to send Ether");
    }
}