import { EventFeed } from "../EventFeed";
import { Button } from "../components/Button";
import { Sidebar } from "../components/Sidebar";
import { Window } from "../components/Window";

export const InGame = ({ accusations, participants, children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="flex flex-col justify-between">
        <EventFeed />

        <Button variant="lively" className="w-full font-bold">
          spread the xmas cheer!
        </Button>
      </Sidebar>

      <main
        className="flex items-center justify-center col-span-3 p-4 bg-cover grow"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
        <Window>
          <ul className="flex flex-wrap gap-2">{children}</ul>
        </Window>
      </main>
    </div>
  );
};
