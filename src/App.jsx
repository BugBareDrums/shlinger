import { useSDK } from "@metamask/sdk-react";
import { BrowserProvider } from "ethers";
import React, { useEffect, useMemo, useState } from "react";
import { Accusation } from "./Accusation";
import "./App.css";
import { accuse } from "./accuse";
import { claimName } from "./claimName";
import { useGetAccusations } from "./getAccusations";
import { useGetParticipants } from "./getParticipants";
import { corroborate } from "./makeStatement";
import { InGame } from "./pages/InGame";

function App() {
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
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

  useEffect(() => {
    if (ethersProvider) {
      ethersProvider.getSigner().then(setSigner);
    }
  }, [ethersProvider]);

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
      <InGame accusations={accusations} participants={participants}>
        {accusations.map((accusation) => {
          return (
            <li>
                        <Accusation
              accused={participants[accusation.accused]}
              accuser={participants[accusation.accuser]}
              claim={accusation.content}
              needed={0}
              current={0}
              onCorroborate={() => {
                corroborate(signer, accusation.uid);
              }}
              onDeny={() => {
                corroborate(signer, accusation.uid);
              }}
            />
            </li>
  
          );
        })}
      </InGame>

      <main className=" col-span-3">
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
