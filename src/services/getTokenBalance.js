import { ethers } from "ethers";

const abi = ["function balanceOf(address addr) view returns (uint)"];
const tokenAddress = "0x00";

export const getTokenBalance = async (signer) => {
  const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
  const tx = await tokenContract.balanceOf(signer.getAddress());
  await tx.wait();
  return tx;
};
