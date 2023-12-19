

export const Accusation =  ({ uid, accused, accuser, claim, needed, current, onCorroborate, onDeny }) => {
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
          {needed} / {current} corroborations
        </p>
        <progress value={current} max={needed} />
      </div>

      <div className="flex gap-5">
        <button className="w-full p-2 border-2 border-black">
          corroborate
        </button>
        <button className="w-full p-2 text-white bg-black border-2 border-black">
        <button className="p-2 border-2 border-black w-full" onClick={onCorroborate}>
          corroborate
        </button>
        <button className="p-2 border-2 border-black bg-black text-white w-full" onClick={onDeny}>
          deny
        </button>
      </div>
    </div>
  );
};
