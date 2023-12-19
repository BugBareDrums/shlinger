import { gql, useQuery } from "@apollo/client";

const GET_ATTESTATIONS = gql`
  query ExampleQuery {
    attestations(
      where: {
        schemaId: {
          equals: "0x94d2ee2cf932ae7585a156e130301464e743ca7fad607f4f095d962c250ce322"
        }
      }
    ) {
      id
      data
      revocable
      revocationTime
      time
      recipient
      decodedDataJson
      attester
    }
  }
`;

export const useGetAccusations = () => {
  const { loading, error, data } = useQuery(GET_ATTESTATIONS, {
    pollInterval: 500,
  });

  if (data == null || data.attestations == null) {
    return { accusations: [], loading, error };
  }

  const sortedAccusations = [...data.attestations].sort(
    (a, b) => a.time > b.time
  );

  const accusations = sortedAccusations.map((att) => {
    const payload = JSON.parse(att.decodedDataJson);
    return {
      accuser: att.attester,
      accused: att.recipient,
      content: payload[1].value.value,
    };
  }, {});

  return { accusations, loading, error };
};
