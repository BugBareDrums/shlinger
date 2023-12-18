import { useSDK } from "@metamask/sdk-react";
import { BrowserProvider } from "ethers";
import React, { useEffect, useMemo, useState } from "react";
import { claimName } from "./claimName";
import { useGetParticipants } from "./getParticipants";

import "./App.css";

function App() {
  const [account, setAccount] = useState();
  const { sdk, connected, provider } = useSDK();
  const { participants } = useGetParticipants();

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

  const hankyImageUrl =
    "https://png2.cleanpng.com/sh/dc7cadd26161be4e03769467c0b1b7b1/L0KzQYm3VcEyN6F5iZH0aYP2gLBuTf1zNZlmht1ueT33eLa0gBhzcaR5hdN8LYDyf37rkvF4cZ9sRdV1aYCwccP7TcVibmZrSdQ9MEfkQLa9TsU4PmQ9SqUEMUW1RoG9V8Y0PmE4SaU3cH7q/kisspng-mr-hankey-the-christmas-poo-drawing-clip-art-5af5f1b407a0e6.5763823915260676360313.png";

  const [displayName, setDisplayName] = useState();

  const onSubmit = async () => {
    await claimName(await ethersProvider.getSigner(), displayName);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shlinger</h1>
        <img src={hankyImageUrl} className="App-logo" alt="logo" />

        <p>
          Stop your friends getting any presents this year by slinging some
          shade.
        </p>
        <h2>Participants</h2>
        {participants &&
          Object.keys(participants).map((walletAddress) => {
            const name = participants[walletAddress];
            return (
              <div key={walletAddress}>
                <p>{name}</p>
              </div>
            );
          })}
        {connected && (
          <div>
            <div>{account && `Connected account: ${account}`}</div>

            <label htmlFor="display_name">Claim name</label>
            <input
              name="display_name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            ></input>
            <input type="submit" value="Submit" onClick={onSubmit}></input>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
