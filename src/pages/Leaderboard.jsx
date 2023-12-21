import { useGetParticipants } from "../services/getParticipants";
import { useGetBalances } from "../services/getTokenBalance";
import { useShit } from "../useShit";

export const LeaderboardPage = () => {
  const { signer, connected } = useShit();

  const { participants = [] } = useGetParticipants();

  const { balances } = useGetBalances(participants, signer);

  if (!connected || !balances) return null;

  return (
    <div className="bg-red-700 p-6 rounded-md text-white">
        <h1 className="text-3xl font-bold">Naughty List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border-b px-8 py-2">Rank</th>
            <th className="border-b px-8 py-2">Name</th>
            <th className="border-b px-8 py-2">Candy</th>
            <th className="border-b px-8 py-2">Coal</th>
            <th className="border-b px-8 py-2">Naughty Score</th>
          </tr>
        </thead>
        <tbody>
          {balances.map(({ name, candy, coal }, index) => (
            <tr>
                <td className="border-b px-8 py-2">{index + 1}</td>
              <td className="border-b px-8 py-2">{name}</td>
              <td className="border-b px-8 py-2">{candy}</td>
              <td className="border-b px-8 py-2">{coal}</td>
                <td className="border-b px-8 py-2">{ coal - candy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
