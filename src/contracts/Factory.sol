// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(
        string memory _name,
        string memory _ticker,
        uint256 _supply
    ) ERC20(_name, _ticker) {
        _mint(msg.sender, _supply);
    }
}

contract Factory {
    address[] public tokens;
    uint256 public tokenCount;
    mapping(address => address) public owner; // First address -> Token Address, Second address -> Creator
    mapping(address => uint256) public price;

    event TokenDeployed(address indexed tokenAddress);
    event PriceUpdated(
        address indexed tokenAddress,
        uint256 indexed price,
        address indexed owner
    );

    function deployToken(
        string calldata _name,
        string calldata _ticker,
        uint256 _supply,
        uint256 _price
    ) public returns (uint256) {
        Token token = new Token(_name, _ticker, _supply);
        token.transfer(msg.sender, _supply);
        tokens.push(address(token));

        tokenCount += 1;
        owner[address(token)] = msg.sender;
        price[address(token)] = _price;

        emit PriceUpdated(address(token), _price, msg.sender);
        emit TokenDeployed(address(token));
        return ERC20(address(token)).allowance(msg.sender, address(this));
    }

    function setPrice(
        address _tokenAddress,
        uint256 _price
    ) public returns (uint256) {
        require(
            msg.sender == owner[_tokenAddress],
            "Only token owner can set price!"
        );

        price[_tokenAddress] = _price;
        emit PriceUpdated(_tokenAddress, _price, msg.sender);
        return _price;
    }

    function buyToken(address _tokenAddress) public payable returns (uint256) {
        require(
            msg.value >= price[_tokenAddress],
            "Please send the asking amount!"
        );

        // Tokens to send
        uint256 totalToken = msg.value / price[_tokenAddress];

        ERC20(_tokenAddress).transferFrom(
            owner[_tokenAddress],
            msg.sender,
            totalToken
        );
        return totalToken;
    }
}
