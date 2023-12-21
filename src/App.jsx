import React from "react";
import "./App.css";
import { claimName } from "./claimName";
import { useGetAccusations } from "./getAccusations";
import { useGetParticipants } from "./getParticipants";
import { InGame } from "./pages/InGame";
import { useShit } from "./useShit";

function App() {
  const { participants = [] } = useGetParticipants();
  const { accusations = [], statements = [] } = useGetAccusations();
  const { signer, connected } = useShit();

  const onSubmitName = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await claimName(signer, formData.get("display_name"));
  };

  return (
    <div className="App text-left">
      <InGame
        accusations={accusations}
        participants={participants}
        statements={statements}
      ></InGame>

      <main className="col-span-3">
   
        {connected && (
          <form onSubmit={onSubmitName}>
            <div className="flex flex-col gap-1">
              <label htmlFor="display_name" className="font-bold">
                Claim name
              </label>
              <div>
                <input
                  name="display_name"
                  className="border-2 p-2 rounded-s-lg"
                />
                <button
                  className="bg-blue-500 p-2 rounded-e-lg text-white"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
