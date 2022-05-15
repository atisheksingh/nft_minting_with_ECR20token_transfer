const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const hre = require("hardhat");

async function main() {
  const tokeninstance = await ethers.getContractFactory('Token')


  const token = await tokeninstance.deploy()
  console.log("token deployed at:", token.address);

  await token.deployTransaction.wait([(confirms = 6)]);
    await hre.run("verify:verify", {

      address: token.address,
      constructorArguments:[]
    });
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  