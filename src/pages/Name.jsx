import { Link, useNavigate } from "react-router-dom";
import { useShit } from "../useShit";
import { useGetName, claimName } from "../services/claimName";
export const Name = () => {
  const {signer, address } = useShit();
  const {name, loading} = useGetName(address);
  const navigate = useNavigate();

  const onSubmitName = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await claimName(signer, formData.get("display_name"));
    navigate("/");
  };


  return (
    <div className="h-screen flex justify-center items-center" style={{
      backgroundImage: "url('/home-bg.png')",
    }}>
        <div className="p-6 bg-red-700 text-white rounded-xl flex flex-col justify-center items-center">
        {loading ? <p>Loading...</p> : name ?<>
        <h1 className="font-bold text-lg">welcome back {name}</h1>
        <Link className="bg-white text-black font-bold px-4 py-2 mt-2 text-sm" to="/">Proceed</Link>
        </> : <>
        <h1 className="font-bold text-lg">choose a name and attest to it</h1>
        <form className="flex flex-col" onSubmit={onSubmitName}>
        <input name="display_name" className="text-black" placeholder="add a name" />
        <button type="submit"  className="bg-white text-black font-bold px-4 py-2 mt-2 text-sm">claim name</button>
        </form>
            </>}
        </div>
    </div>
  );
};
