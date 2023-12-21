  
  import { useSDK } from "@metamask/sdk-react";
import { BrowserProvider, } from "ethers";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

export const useShit = () => {
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const { sdk, connected, provider, connecting } = useSDK();

  useEffect(() => {
    sdk
      ?.connect()
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
      ethersProvider.getSigner().then((s) => {
        s.getAddress().then((a) => setAddress(a));
        setSigner(s);
      });
    }
  }, [ethersProvider, signer]);

  return { signer, connected, address, connecting }
}