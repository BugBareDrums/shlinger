import { useParams } from "react-router-dom";
import { Accusation } from "../accusation";
import { useGetAccusation } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { corroborate, deny } from "../services/makeStatement";
import { useShit } from "../useShit";

export const AccusationPage = () => {
  const { signer, connected } = useShit();

  const { uid } = useParams();
  const { accusation } = useGetAccusation(uid);
  const { participants = [] } = useGetParticipants();

  if (!accusation || !connected) return null;

  return (
    <Accusation
      key={accusation.uid}
      accusation={accusation}
      participants={participants}
      thresholdMet={accusation.corroborations > 3 || accusation.denials > 3}
      onCorroborate={() => {
        corroborate(signer, accusation);
      }}
      onDeny={() => {
        deny(signer, accusation);
      }}
    />
  );
};
