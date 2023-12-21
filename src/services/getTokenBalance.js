import { ethers } from "ethers";
import { useEffect, useState } from "react";

const abi = [
  "function balanceOfBatch(address[] accounts, uint256[]) view returns (uint256[])",
];
const tokenAddress = "0x60C7896E0a08308ADE5173Bd6f4b15B621DA905F";

export const useGetBalances = (participants, signer) => {
  const [balances, setBalances] = useState([]);
  useEffect(() => {
    if (!participants || !signer) return;
    getBalances(participants, signer).then((balances) => {
      balances.sort((a, b) => b.coal - b.candy - (a.coal - a.candy));

      setBalances(balances);
    });
  }, [participants, signer]);

  return { balances };
};

const getBalances = async (participants, signer) => {
  if (!participants || !signer) return [];
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

  const participantScores = [];

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];

    participantScores.push({
      account: account,
      name: participants[account],
      candy: Number(candyCount[i]),
      coal: Number(coalCount[i]),
    });
  }

  return participantScores;
};
