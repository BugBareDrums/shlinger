export const Acc = ({ personA, personB, claim, needed, current }) => {
  return (
    <div className="p-4 bg-white">
      <h3>
        <strong className="font-bold text-blue-500">{personA}</strong>{" "}
        <span>accuses</span>{" "}
        <strong className="font-bold text-green-500">{personB}</strong>
      </h3>

      <p>{claim}</p>

      <div>
        <p>
          {needed} / {current} corroborations
        </p>
        <progress value={current} max={needed} />
      </div>

      <div className="flex gap-5">
        <button className="p-2 border-2 border-black w-full">
          corroborate
        </button>
        <button className="p-2 border-2 border-black bg-black text-white w-full">
          deny
        </button>
      </div>
    </div>
  );
};
