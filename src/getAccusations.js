import { gql, useQuery } from "@apollo/client";

const GET_ACCUSATIONS = gql`
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

const GET_STATEMENTS = gql`
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
      refUID
    }
  }
`;

const toSortedStatements = (dataStatements, dataAccustions) => {
  if (dataStatements == null || dataStatements.attestations == null) {
    return [];
  }
  const sortedStatements = [...dataStatements.attestations].sort((a, b) =>
    a.time > b.time ? 1 : -1
  );

  const statements = sortedStatements.map((statement) => {
    const payload = JSON.parse(statement.decodedDataJson);

    const type = payload[0].value.value;

    const accusation = dataAccustions.attestations.find(
      (a) => a.id === statement.refUID
    );

    return {
      author: statement.attester,
      regardingAccusation: statement.refUID,
      type,
      time: statement.time,
      toSummary: () => ({
        personA: statement.attester,
        personB: accusation?.recipient,
        eventName: type === "corroboration" ? "corroborated" : "denied",
        time: statement.time,
      }),
    };
  });

  return statements;
};

const toSortedAccusations = (dataAccustions, statements) => {
  const sortedAccusations = [...dataAccustions.attestations].sort((a, b) =>
    a.time > b.time ? -1 : 1
  );

  const accusations = sortedAccusations.map((accusation) => {
    const payload = JSON.parse(accusation.decodedDataJson);

    const applicableStatements = statements.filter(
      (s) => s.regardingAccusation === accusation.id
    );

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
      time: accusation.time,
      corroborations,
      denials,
      toSummary: () => ({
        personA: accusation.attester,
        personB: accusation.recipient,
        eventName: "made",
        time: accusation.time,
      }),
    };
  }, {});

  return accusations;
};

export const useGetAccusations = () => {
  const { data: dataStatements } = useQuery(GET_STATEMENTS, {
    pollInterval: 500,
  });

  const { data: dataAccustions } = useQuery(GET_ACCUSATIONS, {
    pollInterval: 500,
  });

  if (dataAccustions == null || dataAccustions.attestations == null) {
    return { statements: [], accusations: [] };
  }

  const statements = toSortedStatements(dataStatements, dataAccustions);
  const accusations = toSortedAccusations(dataAccustions, statements);

  return { accusations, statements };
};
