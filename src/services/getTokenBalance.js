import { ethers } from "ethers";

const abi = [
  "function balanceOfBatch(address[] accounts, uint256[]) view returns (uint256[])",
];
const tokenAddress = "0x60C7896E0a08308ADE5173Bd6f4b15B621DA905F";

export const getTokenBalances = async (participants, signer) => {
  const accounts = Object.keys(participants);
  const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
  const candyTx = await tokenContract.balanceOfBatch(
    accounts,
    accounts.map((_) => 1)
  );
  const coalTx = await tokenContract.balanceOfBatch(
    accounts,
    accounts.map((_) => 2)
  );
  const candyCount = await candyTx;
  const coalCount = await coalTx;

  return {
    candy: candyCount,
    coal: coalCount,
  };
};
