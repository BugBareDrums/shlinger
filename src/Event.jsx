export const Event = ({ personA, personB, eventName }) => {
  return (
    <p>
      <strong className="text-green-500">{personA}</strong> has{" "}
      <span className="text-red-500">{eventName}</span> a claim against{" "}
      <strong className="text-blue-500">{personB}</strong>
    </p>
  );
};
