

export const Accusation =  ({ accused, accuser, claim,  onCorroborate, onDeny, corroborations, denials }) => {
  return (
    <div className="p-4 bg-white">
      <h3>
        <strong className="font-bold text-blue-500">{accuser}</strong>{" "}
        <span>accuses</span>{" "}
        <strong className="font-bold text-green-500">{accused}</strong>
      </h3>

      <p>{claim}</p>

      <div>
        <p>
          {corroborations}  corroborations
        </p>

        <p>
          {denials} denials
        </p>
        <progress value={corroborations} max={corroborations + denials}/>
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
