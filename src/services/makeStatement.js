import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {ethers} from "ethers";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0x38d9a0c6541a923e3d5e9945dbd216bc30f146bfa83c99c52db6d6b54f133ce7";
const eas = new EAS(easContractAddress);

const THRESHOLD = 3;
const tokenAddress = "0x60C7896E0a08308ADE5173Bd6f4b15B621DA905F";

const abi = ["function mint(address account, bool naughty, bytes data)"];

export const corroborate = async (signer, accusation) => {
  if (accusation.corroborations >= THRESHOLD) return

  await makeStatement({
    signer,
    type: "corroboration",
    regardingAccusation: accusation.uid,
    accused: accusation.accused,
  });

  if (accusation.corroborations + 1 === THRESHOLD) {
    const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
    const tx = await tokenContract.mint(accusation.accused, true, ethers.encodeBytes32String("shlinger"))
    await tx.wait();
  }
};

export const deny = async (signer, accusation) => {
  if (accusation.denials >= THRESHOLD) return

  await makeStatement({
    signer,
    type: "denial",
    regardingAccusation: accusation.uid,
    accused: accusation.accused,
  });

  if (accusation.denials + 1 === THRESHOLD) {
    const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
    const tx = await tokenContract.mint(accusation.accused, false, ethers.encodeBytes32String("shlinger"))
    await tx.wait();
  }
};

const makeStatement = async ({
  signer,
  type,
  regardingAccusation,
  accused,
}) => {
  await eas.connect(signer);
  const schemaEncoder = new SchemaEncoder("string type");
  const encodedData = schemaEncoder.encodeData([
    { name: "type", value: type, type: "string" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: accused,
      expirationTime: 0,
      revocable: true,
      data: encodedData,
      refUID: regardingAccusation,
    },
  });
  await tx.wait();



};
