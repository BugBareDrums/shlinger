import { gql, useQuery } from "@apollo/client";

const GET_ATTESTATIONS = gql`
  query ExampleQuery {
    attestations(
      where: {
        schemaId: {
          equals: "0x38d9a0c6541a923e3d5e9945dbd216bc30f146bfa83c99c52db6d6b54f133ce7"
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

export const useGetStatements = () => {
  const { loading, error, data } = useQuery(GET_ATTESTATIONS, {
    pollInterval: 500,
  });

  if (data == null || data.attestations == null) {
    return { statements: [], loading, error };
  }

  const sortedStatements = [...data.attestations].sort(
    (a, b) => a.time > b.time
  );

  const statements = sortedStatements.map((statement) => {
    const payload = JSON.parse(statement.decodedDataJson);
    return {
      author: statement.attester,
      regardingAccusation: statement.refUID,
      type: payload[0].value.value,
    };
  }, {});

  return { statements, loading, error };
};
