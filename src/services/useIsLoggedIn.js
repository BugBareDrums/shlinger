import { useNavigate } from "react-router-dom";
import { useShit } from "../useShit";
import { useGetName } from "./claimName";

export const useIsLoggedIn = () => {
    const {connected, address, connecting} = useShit();
    const {loading, name} = useGetName(address);
    const navigate = useNavigate();
    if (connecting || loading) { return;}
    if (!connected) {
        navigate("/connect");
        return;
    }
    if (!name) {
        navigate("/name");
        return;
    }
    return;
}