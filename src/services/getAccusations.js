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

const GET_ACCUSATION = gql`
  query GetAttestation($uid: String!) {
    attestation(where: { id: $uid }) {
      id
      data
      decodedDataJson
      attester
      recipient
      refUID
      schemaId
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

    const accusation = dataAccustions?.attestations?.find(
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
        regardingAccusation: statement.refUID,
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
        regardingAccusation: accusation.id,
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

export const useGetAccusation = (uid) => {
  const { data } = useQuery(GET_ACCUSATION, {
    variables: { uid },
    // pollInterval: 500,
  });

  const { data: dataStatements } = useQuery(GET_STATEMENTS, {
    // pollInterval: 500,
  });

  if (data == null || data.attestation == null) {
    return { accusation: null };
  }

  const statements = toSortedStatements(dataStatements, null);
  const payload = JSON.parse(data.attestation.decodedDataJson);

  return { accusation: toAccusation(data.attestation, payload, statements) };
};

const toAccusation = (attestation, payload, statements) => {
  const applicableStatements = statements.filter(
    (s) => s.regardingAccusation === attestation.id
  );

  const corroborations = applicableStatements.filter(
    (s) => s.type === "corroboration"
  ).length;
  const denials = applicableStatements.filter(
    (s) => s.type === "denial"
  ).length;
  return {
    uid: attestation.id,
    accuser: attestation.attester,
    accused: attestation.recipient,
    content: payload[1].value.value,
    time: attestation.time,
    corroborations,
    denials,
    toSummary: () => ({
      personA: attestation.attester,
      personB: attestation.recipient,
      eventName: "made",
      time: attestation.time,
      regardingAccusation: attestation.id,
    }),
  };
};
