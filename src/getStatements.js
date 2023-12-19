import { gql, useQuery } from "@apollo/client";

const GET_ATTESTATIONS = gql`
  query ExampleQuery {
    attestations(
      where: {
        schemaId: {
          equals: "0x5bd7a293df49c2ffe2834ff118cefba75d8e4d9a027a0e55865918b5fa2a55f0"
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
      isCorroboration: payload[0].value.value,
      message: payload[1].value.value,
    };
  }, {});

  return { statements, loading, error };
};
