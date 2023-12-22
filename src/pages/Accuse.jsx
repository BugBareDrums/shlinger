import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Loader from "react-spinners/PacmanLoader";
import { Hankey } from "../Hankey";
import { Window } from "../components/Window";
import { accuse } from "../services/accuse";
import { useShit } from "../useShit";

const overrideCss = {
  position: "fixed",
  width: "100%",
  height: "100%",
  left: "0px",
  top: "0px",
  padding: "15%",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.5)",
};

export const Accuse = () => {
  const { signer } = useShit();
  const { participants } = useOutletContext();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitAccusation = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    try {
      const attesationId = await accuse(
        signer,
        formData.get("against"),
        formData.get("accusation")
      );
      navigate(`/accusation/${attesationId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen">
      {isLoading && (
        <div style={overrideCss}>
          <Loader
            loading={true}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
            // cssOverride={overrideCss}
          />
        </div>
      )}

      <main
        className="flex flex-wrap items-center justify-center col-span-3 p-10 bg-center bg-cover grow space-x-4"
        style={{
          backgroundImage: "url('/ingame-bg.png')",
        }}
      >
        <Window className="w-1/2">
          <Window.Img stage="accuse" />
          <Window.Title>what doo-doo do you want throw?</Window.Title>
          <div className="text-left">
            here is where you get to make a claim about someone so santa and his
            elves know what has happened this last year - this helps him build
            his naughty list!
          </div>{" "}
          <Hankey />
          <form onSubmit={onSubmitAccusation}>
            <div className="flex flex-col gap-1">
              <div>
                <select
                  name="against"
                  className=" border-black w-full my-4 border-b-2 p-4"
                >
                  <option value="" disabled selected>
                    who you doo-doo-ing
                  </option>
                  {Object.keys(participants).map((walletAddress) => {
                    const name = participants[walletAddress];
                    return (
                      <option key={walletAddress} value={walletAddress}>
                        {name}
                      </option>
                    );
                  })}
                </select>
                <textarea
                  name="accusation"
                  placeholder="what did they doo-doo?"
                  className="border-2 border-black p-4 w-full h-40"
                ></textarea>
                <div className="flex gap-5 w-full mt-8">
                  <input
                    enabled={!isLoading}
                    type="submit"
                    className="w-full p-2 border-2 border-black"
                    value={"broadcast your claim"}
                  ></input>
                  <Link
                    enabled={!isLoading}
                    to="/"
                    className="w-full p-2 text-white bg-black border-2 border-black"
                  >
                    cancel your claim
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </Window>
      </main>
    </div>
  );
};
