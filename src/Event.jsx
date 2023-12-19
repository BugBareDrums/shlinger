export const Event = ({ personA, personB, eventName }) => {
  return (
    <p>
      <strong className="text-blue-500">{personA}</strong> has{" "}
      <span>{eventName}</span> a claim against{" "}
      <strong className="text-green-500">{personB}</strong>
    </p>
  );
};
