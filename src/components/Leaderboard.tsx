import { Button } from "./Button";

type LeaderboardProps = {
  leaderboard: {
    name: string;
    coal: number;
    candy: number;
    score: number;
  }[];
};

export const Leaderboard = ({ leaderboard }: LeaderboardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 p-4 text-white bg-red-600 rounded-lg">
      <table>
        <thead className="border-b border-1">
          <tr>
            <th className="p-2 font-normal" align="left">
              Place
            </th>
            <th className="p-2 font-normal" align="center">
              Name
            </th>
            <th className="p-2 font-normal" align="center">
              COAL
            </th>
            <th className="p-2 font-normal" align="center">
              CANDY
            </th>
            <th className="p-2 font-normal" align="right">
              NAUGHTY SCORE
            </th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index} className="border-b border-1">
              <td className="p-2" align="left">
                {index + 1}
              </td>
              <td className="p-2" align="center">
                {player.name}
              </td>
              <td className="p-2" align="center">
                {player.coal} COAL
              </td>
              <td className="p-2" align="center">
                {player.candy} CANDY
              </td>
              <td className="p-2" align="right">
                {player.score} NAUGHTY
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button variant="primary" className="px-12 font-bold border-0">
        finish
      </Button>
    </div>
  );
};
