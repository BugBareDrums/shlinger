import { Link } from "react-router-dom";
import { useShit } from "../useShit";
export const Connect = () => {
  const { signer, connected } = useShit();

  return (
    <div className="h-screen flex justify-center items-center" style={{
      backgroundImage: "url('/home-bg.png')",
    }}>
      <form className="p-6 bg-red-700 text-white rounded-xl flex flex-col justify-center items-center">
        <h1 className="font-bold text-lg">welcome to SHLINGER</h1>
        <p className="text-xs">time to spread some holiday cheer</p>
        {!connected ? <button className="bg-white text-black font-bold px-4 py-2 mt-2 text-sm">Connect</button> : <Link className="bg-white text-black font-bold px-4 py-2 mt-2 text-sm" to="/name">Proceed</Link>}
      </form>
    </div>
  );
};
