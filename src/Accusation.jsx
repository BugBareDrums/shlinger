import { Progress } from "./components/Progress";
import { Window } from "./components/Window";

export const Accusation = ({
  accusation,
  onCorroborate,
  onDeny,
  participants,
  accusationState,
}) => {
  return (
    <Window key={accusation.uid}>
      <Window.Img
        stage={
          accusationState === 0
            ? "accused"
            : accusationState === 1
            ? "truth"
            : "lie"
        }
      />
      {accusationState === 0 && (
        <Window.Title>
          {participants[accusation.accuser] ?? "unknown"}{" "}
          <span className="font-normal">has accused</span>{" "}
          {participants[accusation.accused] ?? "unknown"}
        </Window.Title>
      )}
      {accusationState === 1 && (
        <Window.Title>
          FACT! {participants[accusation.accuser] ?? "unknown"}...
        </Window.Title>
      )}

      {accusationState === 2 && (
        <Window.Title>
          LIE! {participants[accusation.accuser] ?? "unknown"} didn't...
        </Window.Title>
      )}
      <div className="text-3xl p-8">"{accusation.content}"</div>
      <div>
        <Progress current={accusation.corroborations} max={3} variant="good" />
        <Progress current={accusation.denials} max={3} variant="bad" />
      </div>

      {accusationState === 0 && (
        <div className="flex gap-5">
          <button
            className={"w-full p-2 border-2 border-black"}
            onClick={onCorroborate}
          >
            corroborate
          </button>
          <button
            className={"w-full p-2 text-white bg-black border-2 border-black"}
            onClick={onDeny}
          >
            deny
          </button>
        </div>
      )}
    </Window>
  );
};
