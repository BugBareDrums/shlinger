import { Button } from "@components/button";

import React from "react";
import "./App.css";
import { InGame } from "./pages/InGame";
import { useAccusor } from "./hooks/useAccusor";
import { useGetParticipants } from "./getParticipants";
import { useGetAccusations } from "./getAccusations";

function App() {
  const { participants } = useGetParticipants();
  const { accusations } = useGetAccusations();

  const { setName, accuse, connected, account } = useAccusor;

  const onSubmitName = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    setName(formData.get("display_name"));
  };

  const onSubmitAccusation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    accuse(formData.get("accusation"), formData.get("against"));
  };

  return (
    <div className="text-left App">
      <InGame accusations={accusations} participants={participants} />

      <main className="col-span-3 ">
        {connected && (
          <form onSubmit={onSubmitAccusation}>
            <div className="flex flex-col gap-1">
              <label htmlFor="accusation" className="font-bold">
                Make an accusation
              </label>
              <div>
                <input
                  name="accusation"
                  className="p-2 border-2 rounded-s-lg"
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
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </form>
        )}
        {connected && (
          <form onSubmit={onSubmitName}>
            <div>{account && `Connected account: ${account}`}</div>
            <div className="flex flex-col gap-1">
              <label htmlFor="display_name" className="font-bold">
                Claim name
              </label>
              <div>
                <input
                  name="display_name"
                  className="p-2 border-2 rounded-s-lg"
                />
                <Button type="submit">submit</Button>
              </div>
            </div>
          </form>
        )}
      </main>

      <aside className="">
        <h2 className="text-xl font-bold">Participants</h2>
        {participants &&
          Object.keys(participants).map((walletAddress) => {
            const name = participants[walletAddress];
            return (
              <div key={walletAddress}>
                <p>{name}</p>
              </div>
            );
          })}
      </aside>
    </div>
  );
}

export default App;
