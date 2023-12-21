import { Link, Outlet } from "react-router-dom";
import { EventFeed } from "../EventFeed";
import { Sidebar } from "../components/Sidebar";
import { useGetAccusations } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { useIsLoggedIn } from "../services/useIsLoggedIn";

export const Root = () => {
  const { participants = [] } = useGetParticipants();
  const { accusations = [], statements = [] } = useGetAccusations();

  useIsLoggedIn();


  return (
    <div className="h-screen grid grid-cols-4 overflow-hidden">
      <Sidebar className="h-screen flex flex-col justify-between overflow-auto	">
        <div className="flex p-4 space-x-4 m-x-2">
          <Link to="/" className="block w-full font-bold text-center text-black border-yellow-400">
            doo-doos
          </Link>
          <Link to="/naughty-list" className="block w-full font-bold text-center text-black border-yellow-400">
            naughty list
          </Link>
        </div>
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
        className="flex flex-wrap items-center justify-center col-span-3 p-10 bg-center bg-cover grow space-x-4 overflow-scroll"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
      <Outlet context={{participants}} />
      </main>
    </div>
  );
};
