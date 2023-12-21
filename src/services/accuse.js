import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0x94d2ee2cf932ae7585a156e130301464e743ca7fad607f4f095d962c250ce322";
const eas = new EAS(easContractAddress);

export const accuse = async (signer, against, content) => {
  console.log({ signer, against, content });
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder("address against,string content");
  const encodedData = schemaEncoder.encodeData([
    {
      name: "against",
      value: against,
      type: "address",
    },
    { name: "content", value: content, type: "string" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: against,
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });
  const newAttestationUID = await tx.wait();
  return newAttestationUID;
};
