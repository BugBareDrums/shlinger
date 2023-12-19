import { Button } from "@components/Button";
import { Progress } from "@components/Progress";

export const Accusation = ({
  uid,
  accused,
  accuser,
  claim,
  needed,
  current,
  onCorroborate,
  onDeny,
}) => {
  return (
    <div className="p-4 bg-white">
      <h3>
        <strong className="font-bold text-blue-500">{accuser}</strong>{" "}
        <span>accuses</span>{" "}
        <strong className="font-bold text-green-500">{accused}</strong>
      </h3>

      <p>{claim}</p>

      <Progress
        current={current}
        max={needed}
        className="w-full mt-2 mb-4"
        variant="bad"
      />

      <div className="grid grid-cols-2 gap-1">
        <Button className="w-full" variant="primary" onClick={onCorroborate}>
          corroborate
        </Button>
        <Button className="w-full" variant="secondary" onClick={onDeny}>
          deny
        </Button>
      </div>
    </div>
  );
};
