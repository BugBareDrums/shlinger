import { useNavigate } from "react-router-dom";
import { useShit } from "../useShit";
import { useGetName } from "./claimName";
import { useEffect } from "react";

export const useIsLoggedIn = () => {
    const {connected, address, connecting} = useShit();
    const {loading, name} = useGetName(address);
    const navigate = useNavigate();
    useEffect(()=> {
        console.log({
            connected,
            address,
            connecting,
            loading,
            name,
        
        })
        if (connecting || loading || !address) { return;}
    if (!connected) {
        navigate("/connect");
        return;
    }
    if (!name) {
        navigate("/name");
        return;
    }
    }, [connecting, loading, connected, name, navigate]);
    }