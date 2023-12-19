import { Acc } from "../Acc";
import { EventFeed } from "../EventFeed";

export const InGame = () => {
  return (
    <div className="h-full grid grid-cols-4">
      <aside className="col-span-1">
        <EventFeed />
      </aside>

      <main
        className="col-span-3 flex justify-center items-center"
        style={{
          backgroundImage: "/ingame-bg.png",
        }}
      >
        <Acc
          personA="peter"
          personB="paul"
          claim="sells avon"
          needed={5}
          current={1}
        />
      </main>
    </div>
  );
};
