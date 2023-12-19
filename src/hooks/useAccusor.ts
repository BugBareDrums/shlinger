import { useEffect, useState, useMemo } from "react";
import { BrowserProvider } from "ethers";
import {
  corroborate as sendCorroboration,
  deny as sendDenial,
} from "../makeStatement";
import { accuse as sendAccusation } from "../accuse";

import { useSDK } from "@metamask/sdk-react";

import { claimName } from "../claimName";

export const useAccusor = () => {
  useEffect(() => {
    sdk
      ?.connect()
      .then((accounts) => setAccount(accounts?.[0]))
      .catch((err) => console.warn(`failed to connect..`, err));
  });

  const [account, setAccount] = useState();
  const { sdk, connected, provider } = useSDK();

  const ethersProvider = useMemo(() => {
    if (connected && provider) {
      return new BrowserProvider(provider);
    }
    return null;
  }, [connected, provider]);

  const setName = async (name: string) => {
    await claimName(await ethersProvider?.getSigner(), name);
  };

  const accuse = async (against: string, accusation: string) => {
    const signer = await ethersProvider?.getSigner();

    await sendAccusation(signer, against, accusation);
  };

  const corroborate = async (accusationId: string) => {
    const signer = await ethersProvider?.getSigner();

    sendCorroboration(signer, accusationId);
  };

  const deny = async (accusationId: string) => {
    const signer = await ethersProvider?.getSigner();

    sendDenial(signer, accusationId);
  };

  return {
    connected,
    setName,
    accuse,
    corroborate,
    deny,
    account,
  };
};
