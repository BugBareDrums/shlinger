import { useState } from "react";
import { Accusation } from "../Accusation";
import { EventFeed } from "../EventFeed";
import { Button } from "../components/Button";
import { Sidebar } from "../components/Sidebar";
import { Window } from "../components/Window";
import { corroborate, deny } from "../makeStatement";
import { useShit } from "../useShit";

export const InGame = ({ accusations, participants, statements, onSubmitAccusation }) => {
  const { signer } = useShit();

  const [state, setState] = useState("accusations");

  return (
    <div className="flex min-h-screen">
      <Sidebar className="flex flex-col justify-between">
        <EventFeed
          accusations={accusations}
          participants={participants}
          statements={statements}
        />

        <Button variant="lively" className="w-full font-bold" onClick={() => setState("accuse")}>
          spread the xmas cheer!
        </Button>
      </Sidebar>

      <main
        className="flex items-center justify-center col-span-2 p-10 bg-center bg-cover grow space-x-4"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
        {state === "accuse" && (
          <Window>
            <Window.Img stage="accuse" />
            <Window.Title>Make an accusation</Window.Title>
            <form onSubmit={onSubmitAccusation}>
              <div className="flex flex-col gap-1">
                <div>
                  <input
                    name="accusation"
                    className="border-2 p-2 rounded-s-lg"
                  ></input>
                  <select name="against">
                    {Object.keys(participants).map((walletAddress) => {
                      const name = participants[walletAddress];
                      return (
                        <option key={walletAddress} value={walletAddress}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    type="submit"
                    className="bg-blue-500 p-2 rounded-e-lg text-white"
                  ></input>
                </div>
              </div>
            </form>
          </Window>
          )}

        {state === "accusations" && accusations.map((accusation) => {
          return (
            <Accusation
              key={accusation.uid}
              accusation={accusation}
              participants={participants}
              onCorroborate={() => {
                corroborate(signer, accusation.uid, accusation.accused);
              }}
              onDeny={() => {
                deny(signer, accusation.uid, accusation.accused);
              }}
            />
          );
        })}

      </main>
    </div>
  );
};
