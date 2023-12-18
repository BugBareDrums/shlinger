import { gql, useQuery } from "@apollo/client";

const GET_ATTESTATIONS = gql`
  query ExampleQuery {
    attestations(
      where: {
        schemaId: {
          equals: "0xd197b54111dc7589f24dd29c9affafa84ee91fe31c78aecde2c1a281fce6cbaf"
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

export const useGetParticipants = () => {
  const { loading, error, data } = useQuery(GET_ATTESTATIONS);

  const participants = data?.attestations?.reduce((acc, curr) => {
    const payload = JSON.parse(curr.decodedDataJson);
    return {
      ...acc,
      [curr.attester]: payload[0].value.value,
    };
  }, {});

  return { participants, loading, error };
};
