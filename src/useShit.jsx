  
  import { useSDK } from "@metamask/sdk-react";
import { BrowserProvider, } from "ethers";
import { useEffect, useMemo, useState } from "react";
import "./App.css";


export const useShit = () => {
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const { sdk, connected, provider } = useSDK();

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
      ethersProvider.getSigner().then((s) => setSigner(s));
    }
  }, [ethersProvider]);

  useEffect(() => {
    if (signer) {
      signer.getAddress().then((a) => setAddress(a));
    }
  }, [signer])

  return { signer, connected, address }
}