import { Window } from "../components/Window";
import { Sidebar } from "../components/Sidebar";
import { Button } from "../components/Button";
import { Accusation } from "../Accusation";
import { EventFeed } from "../EventFeed";

export const InGame = ({ accusations, participants }) => {
  return (
    <div className="flex">
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
          <ul className="flex flex-wrap gap-2">
            <li>
              {accusations?.map((accusation) => {
                return (
                  <Accusation
                    accused={participants[accusation.accused]}
                    accuser={participants[accusation.accuser]}
                    claim={accusation.content}
                    needed={0}
                    current={0}
                  />
                );
              })}
            </li>
          </ul>
        </Window>
      </main>
    </div>
  );
};
