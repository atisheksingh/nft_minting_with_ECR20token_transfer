const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const hre = require("hardhat");

async function main() {
  
  const _nft = await ethers.getContractFactory('NFTWT')


 const nft = await _nft.deploy( "0x976756839c6F441b1e2c8E6f01d9354C3CCc9ace",'10')
 console.log("nft deployed at:", nft.address);

  await nft.deployTransaction.wait([(confirms = 6)]);
    await hre.run("verify:verify", {

      address: nft.address,
      constructorArguments:["0x976756839c6F441b1e2c8E6f01d9354C3CCc9ace",'10']
    });
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  