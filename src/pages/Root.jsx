import { Link, Outlet } from "react-router-dom";
import { EventFeed } from "../EventFeed";
import { Sidebar } from "../components/Sidebar";
import { useGetAccusations } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { getTokenBalances } from "../services/getTokenBalance";
import { useShit } from "../useShit";

export const Root = () => {
  const { participants = [] } = useGetParticipants();
  const { accusations = [], statements = [] } = useGetAccusations();
  const { signer, connected } = useShit();

  const {candy, coal} = getTokenBalances(participants, signer);

  console.log({candy, coal})

  return (
    <div className="h-screen grid grid-cols-4 overflow-hidden">
      <Sidebar className="h-screen flex flex-col justify-between overflow-auto	">
      
        <EventFeed
          accusations={accusations}
          participants={participants}
          statements={statements}
        />
        <div className="flex-none p-4 bg-yellow-400">
          <Link to="/accuse" className="block w-full font-bold text-center text-black border-yellow-400">
          spread the xmas cheer!
        </Link>
        </div>
      </Sidebar>
      <main
        className="flex flex-wrap items-center justify-center col-span-3 p-10 bg-center bg-cover grow space-x-4"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
      <Outlet context={{participants}} />
      </main>
    </div>
  );
};
