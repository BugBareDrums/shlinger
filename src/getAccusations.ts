import { gql, useQuery } from "@apollo/client";
import { useGetStatements } from "./getStatements";

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

  const { statements = [] } = useGetStatements();

  console.log({ statements });

  if (data == null || data.attestations == null) {
    return { accusations: [], loading, error };
  }

  const sortedAccusations = [...data.attestations].sort((a, b) =>
    a.time > b.time ? -1 : 1
  );

  const accusations = sortedAccusations.map((accusation) => {
    const payload = JSON.parse(accusation.decodedDataJson);
    const applicableStatements = statements.filter(
      (s) => s.regardingAccusation === accusation.id
    );

    console.log({ applicableStatements });

    const corroborations = applicableStatements.filter(
      (s) => s.type === "corroboration"
    ).length;
    const denials = applicableStatements.filter(
      (s) => s.type === "denial"
    ).length;

    return {
      uid: accusation.id,
      accuser: accusation.attester,
      accused: accusation.recipient,
      content: payload[1].value.value,
      corroborations,
      denials,
    };
  }, {});

  return { accusations, loading, error };
};
