import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { useQuery, gql } from "@apollo/client";

const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID =
  "0xd197b54111dc7589f24dd29c9affafa84ee91fe31c78aecde2c1a281fce6cbaf";
const eas = new EAS(easContractAddress);

export const claimName = async (signer, display_name) => {
  console.log(signer);
  console.log(display_name);
  eas.connect(signer);

  const schemaEncoder = new SchemaEncoder("string display_name");
  const encodedData = schemaEncoder.encodeData([
    { name: "display_name", value: display_name, type: "string" },
  ]);
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: await signer.getAddress(),
      expirationTime: 0,
      revocable: true,
      data: encodedData,
    },
  });
  const newAttestationUID = await tx.wait();
  return newAttestationUID;
};

const GET_NAME = gql`
query GetName($address: String!, $schemaId: String!) {
  findFirstAttestation(where: {
    attester: {
      equals: $address
    },
    schemaId: {
      equals: $schemaId
    }
  }){
    id
    data
    decodedDataJson
    attester
    recipient
    refUID
    schemaId
  }
}
`

export const useGetName = (address) => {
  const {data, loading} = useQuery(GET_NAME, {
    variables: {
      address,
      schemaId: schemaUID
    }
  })
  if (loading || !address || !data.findFirstAttestation) return {
    loading,
    name: null
  };
  const decoded = JSON.parse(data.findFirstAttestation.decodedDataJson);
  return {
    loading,
    name: decoded[0].value.value
  }
}
