// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Token_ERC20.sol";


contract NFTWT is ERC721 {

  
    uint256 public price;
    address public tokenContract;
    uint256 public tokenId = 0;

    constructor(address _tokenContract, uint256 _price) ERC721("MyNFT", "NFT") {
        tokenContract = _tokenContract;
        price = _price;
       
    }

    function Purchase() public {
        ERC20(tokenContract).approve(address(this), price);
        ERC20(tokenContract).transferFrom(msg.sender, address(this), price);
        _safeMint(msg.sender, tokenId);
        tokenId = tokenId+1;
    }

    function sell( uint tokenid) public {
    transferFrom(msg.sender, address(this), tokenid);
    ERC20(tokenContract).transfer( msg.sender,price);
    }
 

}
