import { Progress } from "./components/Progress";
import { Window } from "./components/Window";


export const Accusation = ({
  accusation,
  onCorroborate,
  onDeny,
  participants,
  thresholdMet
}) => {
  return (
    <Window key={accusation.uid}>
      <Window.Img stage={thresholdMet ? "truth" : "accused"} />
        {!thresholdMet &&
            <Window.Title>
                {participants[accusation.accuser] ?? "unknown"} has accused {" "}
                {participants[accusation.accused] ?? "unknown"}
            </Window.Title>
        }
        {thresholdMet &&
            <Window.Title>
                FACT!!!!!! {" : "} {participants[accusation.accuser] ?? "unknown"}...
            </Window.Title>
        }
      <Window.Subtitle>"{accusation.content}"</Window.Subtitle>
      <div>
        <Progress current={accusation.corroborations} max={3} variant="good" />
        <Progress current={accusation.denials} max={3} variant="bad" />
      </div>

      <div className="flex gap-5">
        <button
            disabled={thresholdMet}
            className={thresholdMet ? "w-full p-2 border-2 border-black opacity-50 cursor-not-allowed" : "w-full p-2 border-2 border-black"}
          onClick={onCorroborate}
        >
          corroborate
        </button>
        <button
            disabled={thresholdMet}
            className={thresholdMet ? "w-full p-2 text-white bg-black border-2 border-black opacity-50 cursor-not-allowed" : "w-full p-2 text-white bg-black border-2 border-black"}
          onClick={onDeny}
        >
          deny
        </button>
      </div>
    </Window>
  );
};
