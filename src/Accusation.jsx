import { Progress } from "./components/Progress";
export const Accusation = ({
  accused,
  accuser,
  claim,
  onCorroborate,
  onDeny,
  corroborations,
  denials,
}) => {
  return (
    <div className="p-4 bg-white">
      <h3>
        <strong className="font-bold text-blue-500">{accuser}</strong>{" "}
        <span>accuses</span>{" "}
        <strong className="font-bold text-green-500">{accused}</strong>
      </h3>

      <p className="font-bold p-3">{claim}</p>

      <div>
        <Progress current={corroborations} max={3} variant="good" />
        <Progress current={denials} max={3} variant="bad" />
      </div>

      <div className="flex gap-5">
        <button
          className="w-full p-2 border-2 border-black"
          onClick={onCorroborate}
        >
          corroborate
        </button>
        <button
          className="w-full p-2 text-white bg-black border-2 border-black"
          onClick={onDeny}
        >
          deny
        </button>
      </div>
    </div>
  );
};
