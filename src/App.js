import { useSDK } from "@metamask/sdk-react";
import { BrowserProvider } from "ethers";
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { accuse } from "./accusation";
import { claimName } from "./claimName";
import { useGetAccusations } from "./getAccusations";
import { useGetParticipants } from "./getParticipants";
import { InGame } from "./pages/InGame";

function App() {
  const [account, setAccount] = useState();
  const { sdk, connected, provider } = useSDK();
  const { participants = [] } = useGetParticipants();
  const { accusations = [] } = useGetAccusations();

  useEffect(() => {
    sdk
      ?.connect()
      .then((accounts) => setAccount(accounts?.[0]))
      .catch((err) => console.warn(`failed to connect..`, err));
  });

  const ethersProvider = useMemo(() => {
    if (connected && provider) {
      return new BrowserProvider(provider);
    }
    return null;
  }, [connected, provider]);

  console.log({ accusations });

  const onSubmitName = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await claimName(
      await ethersProvider.getSigner(),
      formData.get("display_name")
    );
  };
  const onSubmitAccusation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await accuse(
      await ethersProvider.getSigner(),
      formData.get("against"),
      formData.get("accusation")
    );
  };

  return (
    <div className="App text-left">
      <InGame />

      <main className=" col-span-3">
        <h2 className="text-xl font-bold">Accusations</h2>
        {accusations.map((accusation) => {
          return (
            <div key={accusation.id}>
              <p>Against: {participants[accusation.against]}</p>
              <p>{accusation.content}</p>
            </div>
          );
        })}
        {connected && (
          <form onSubmit={onSubmitAccusation}>
            <div className="flex flex-col gap-1">
              <label htmlFor="accusation" className="font-bold">
                Make an accusation
              </label>
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
                  value="Submit"
                ></input>
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
