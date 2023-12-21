import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0x38d9a0c6541a923e3d5e9945dbd216bc30f146bfa83c99c52db6d6b54f133ce7";
const eas = new EAS(easContractAddress);

export const corroborate = async (signer, accusationUID, accused) => {
  await makeStatement({
    signer,
    type: "corroboration",
    regardingAccusation: accusationUID,
    accussed: accused,
  });
};

export const deny = async (signer, accusationUID, accused) => {
  await makeStatement({
    signer,
    type: "denial",
    regardingAccusation: accusationUID,
    accussed: accused,
  });
};

const makeStatement = async ({
  signer,
  type,
  regardingAccusation,
  accussed: accused,
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
