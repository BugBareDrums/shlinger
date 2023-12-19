import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0x38d9a0c6541a923e3d5e9945dbd216bc30f146bfa83c99c52db6d6b54f133ce7";
const eas = new EAS(easContractAddress);

export const corroborate = async (signer, accusationUID) => {
  await makeStatement({
    signer,
    type: "corroboration",
    aboutAccusation: accusationUID,
  });
};

export const deny = async (signer, accusationUID) => {
  await makeStatement({
    signer,
    type: "denial",
    aboutAccusation: accusationUID,
  });
};

const makeStatement = async ({ signer, type, aboutAccusation }) => {
  await eas.connect(signer);
  const schemaEncoder = new SchemaEncoder(
    "bool is_corroboration,string message"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "type", value: type, type: "string" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: "0x0000000000000000000000000000000000000000",
      expirationTime: 0,
      revocable: true,
      data: encodedData,
      refUID: aboutAccusation,
    },
  });
  const newAttestationUID = await tx.wait();
  console.log("New attestation UID:", newAttestationUID);
};
