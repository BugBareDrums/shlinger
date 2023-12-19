import { Accusation } from "../Accusation";
import { EventFeed } from "../EventFeed";
import { corroborate } from "../makeStatement";

export const InGame = ({ accusations, participants }) => {
  return (
    <div className="grid h-full grid-cols-4">
      <aside className="col-span-1">
        <EventFeed />
      </aside>

      <main
        className="flex items-center justify-center col-span-3"
        style={{
          backgroundImage: "/ingame-bg.png",
        }}
      >
        {accusations?.map((accusation) => {
          return (
            <Accusation
              accused={participants[accusation.accused]}
              accuser={participants[accusation.accuser]}
              claim={accusation.content}
              needed={0}
              current={0}
              onCorroborate={() => { corroborate(signer, accusation.uid) }}
              onDeny={() => {corroborate(signer, accusation.uid)}}
            />
          );
        })}
      </main>
    </div>
  );
};
