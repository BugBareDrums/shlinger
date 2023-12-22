import { useNavigate, useOutletContext } from "react-router-dom";
import { Hankey } from "../Hankey";
import { Window } from "../components/Window";
import { accuse } from "../services/accuse";
import { useShit } from "../useShit";


export const Accuse = () => {
  const { signer } = useShit();
  const {participants} = useOutletContext();
  const navigate = useNavigate();
   

  const onSubmitAccusation = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try{
       const attesationId = await accuse(signer, formData.get("against"), formData.get("accusation"));
      navigate(`/accusation/${attesationId}`);
    }
    catch(err){
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <main
        className="flex flex-wrap items-center justify-center col-span-3 p-10 bg-center bg-cover grow space-x-4"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
 
          <Window>
            <Window.Img stage="accuse" />
            <Window.Title>Make an accusation</Window.Title>
            <Hankey />
            <form onSubmit={onSubmitAccusation}>
              <div className="flex flex-col gap-1">
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
                  ></input>
                </div>
              </div>
            </form>
          </Window>
      

  

      </main>
    </div>
  );
};
