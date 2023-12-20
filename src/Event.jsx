export const Event = ({ personA, personB, eventName, time }) => {
  return (
    <p className="p-2">
      <p className="text-gray-500">{(new Date(time * 1000)).toLocaleString()}</p>
      <strong className="text-blue-500">{personA}</strong> has{" "}
      <span>{eventName}</span> a claim against{" "}
      <strong className="text-green-500">{personB}</strong>
    </p>
  );
};
