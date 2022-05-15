const { expect } = require("chai");
const { ethers } = require("hardhat");
const { parseUnits } = require("@ethersproject/units");



describe("setup", ()=> {
  before(async ()=> {
    accounts = await ethers.getSigners();
    [owner,u1,u2,u3,u4]= accounts;
    const tokeninstance = await ethers.getContractFactory('Token')
    const _nft = await ethers.getContractFactory('NFTWT')

    token = await tokeninstance.deploy()
    nft = await _nft.deploy( token.address,'10')
    var t1 = await token.totalSupply();
    await token.approve(nft.address,t1);
  
    
    for (let i = 1; i < 6; i++) {
      await token.transfer(accounts[i].address, 1000);
      await token.connect(accounts[i]).increaseAllowance(nft.address, parseUnits('1000', 18));
      console.log(`${accounts[i].address} received ${(await token.balanceOf(accounts[i].address)).toString()} tokens`);
  }
 
  })
   it("should Purchase", async function () {

    for(let i =0; i<6; i++){
      await nft.connect(accounts[i]).Purchase();
      console.log(`${i} brought nft by,${accounts[i].address.toString()}`);
      expect(await nft.balanceOf(accounts[i].address)).to.equal(1);
    console.log(`${accounts[i].address} have ${(await token.balanceOf(accounts[i].address)).toString()} tokens`);
    }
  });
  it('should sell ', async function (){
    var id  = await nft.tokenId()
    console.log(id.toString());


     for (let i =0 ; i< 6; i++)
     {
       var a = await nft.ownerOf(i);
       console.log(`${i} owned by ${a.toString()}`);
       await nft.connect(accounts[i]).approve(nft.address,i)
       await nft.connect(accounts[i]).sell(i);
       expect(await nft.balanceOf(accounts[i].address)).to.equal(0);
       console.log(`${accounts[i].address} have ${(await token.balanceOf(accounts[i].address)).toString()} tokens`);
    }

   


  })


});
