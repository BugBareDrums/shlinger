import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0x5bd7a293df49c2ffe2834ff118cefba75d8e4d9a027a0e55865918b5fa2a55f0";
const eas = new EAS(easContractAddress);

export const corroborate = async (signer, accusationUID) => {
  await makeStatement({
    signer,
    type: "corroboration",
    message: "",
    aboutAccusation: accusationUID,
  });
};

export const deny = async (signer, accusationUID) => {
  await makeStatement({
    signer,
    type: "denial",
    message,
    aboutAccusation: accusationUID,
  });
};

const makeStatement = async ({ signer, type, message, aboutAccusation }) => {
  await eas.connect(signer);
  const schemaEncoder = new SchemaEncoder(
    "bool is_corroboration,string message"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "type", value: type, type: "string" },
    { name: "message", value: message, type: "string" },
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
