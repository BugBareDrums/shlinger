import { Link, Outlet } from "react-router-dom";
import { EventFeed } from "../EventFeed";
import { Sidebar } from "../components/Sidebar";
import { useGetAccusations } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { useShit } from "../useShit";

export const Root = () => {
  const { participants = [] } = useGetParticipants();
  const { accusations = [], statements = [] } = useGetAccusations();
  const { signer, connected } = useShit();
  return (
    <div className="grid grid-cols-4">
      <Sidebar className="flex flex-col justify-between">
        <EventFeed
          accusations={accusations}
          participants={participants}
          statements={statements}
        />

        <Link to="/accuse" className="w-full font-bold bg-yellow-400 text-black border-yellow-400">
          spread the xmas cheer!

        </Link>
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
