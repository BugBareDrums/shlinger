import { useState } from "react";
import { EventFeed } from "../EventFeed";
import { Button } from "../components/Button";
import { Sidebar } from "../components/Sidebar";
import { Window } from "../components/Window";
import { accuse } from "../services/accuse";
import { useShit } from "../useShit";
import { useIsLoggedIn } from "../services/useIsLoggedIn";

export const InGame = ({ accusations, participants, statements }) => {
  const { signer } = useShit();

  const [state, setState] = useState("accusations");
   
  const onSubmitAccusation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setState("accusations");

    try{
       await accuse(signer, formData.get("against"), formData.get("accusation"));
    }
    catch(err){
      console.error(err);
    }
  };

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
        className="flex flex-wrap items-center justify-center col-span-3 p-10 bg-center bg-cover grow space-x-4"
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

      </main>
    </div>
  );
};
