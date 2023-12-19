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

  console.log({ participants });

  const participantsArray =
    participants != null
      ? Object.keys(participants).map((walletAddress) => {
          return {
            walletAddress,
            name: participants[walletAddress],
          };
        })
      : [];

  console.log({ participantsArray });

  const accusations =
    participants == null
      ? []
      : [
          {
            against: participantsArray[0]?.walletAddress,
            content: "They stole my biscuit",
            disputes: [
              {
                from: participantsArray[1]?.walletAddress,
                content: "That's BS",
              },
            ],
            confimations: [
              {
                from: participantsArray[2]?.walletAddress,
                content: "Literally totes did it",
              },
            ],
          },
        ];

  console.log({ accusations });

  const hankyImageUrl =
    "https://png2.cleanpng.com/sh/dc7cadd26161be4e03769467c0b1b7b1/L0KzQYm3VcEyN6F5iZH0aYP2gLBuTf1zNZlmht1ueT33eLa0gBhzcaR5hdN8LYDyf37rkvF4cZ9sRdV1aYCwccP7TcVibmZrSdQ9MEfkQLa9TsU4PmQ9SqUEMUW1RoG9V8Y0PmE4SaU3cH7q/kisspng-mr-hankey-the-christmas-poo-drawing-clip-art-5af5f1b407a0e6.5763823915260676360313.png";

  const [displayName, setDisplayName] = useState();

  const onSubmit = async () => {
    await claimName(await ethersProvider.getSigner(), displayName);
  };

  return (
    <>
      <div className="wrapper">
        <div className="inner">
          <img src={hankyImageUrl} className="App-logo" alt="logo" />
        </div>
      </div>

      <div className="App">
        <header className="App-header">
          <h1>Shlinger</h1>

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
          <h2>Accusations</h2>
          {accusations.map((accusation) => {
            return (
              <div key={accusation.id}>
                <p>Against: {participants[accusation.against]}</p>
                <p>{accusation.content}</p>
                <h3>Disputes</h3>
                {accusation.disputes.map((dispute) => {
                  return (
                    <div key={dispute.id}>
                      <p>From: {participants[dispute.from]}</p>
                      <p>{dispute.content}</p>
                    </div>
                  );
                })}
                <h3>Confirmations</h3>
                {accusation.confimations.map((confirmation) => {
                  return (
                    <div key={confirmation.id}>
                      <p>From: {participants[confirmation.from]}</p>
                      <p>{confirmation.content}</p>
                    </div>
                  );
                })}
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
    </>
  );
}

export default App;
