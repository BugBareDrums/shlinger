import { useParams } from "react-router-dom";
import { Accusation } from "../accusation";
import { useGetAccusation } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { corroborate, deny } from "../services/makeStatement";
import { useShit } from "../useShit";

const THRESHOLD = 3;

export const AccusationPage = () => {
  const { signer, connected } = useShit();

  const { uid } = useParams();
  const { accusation } = useGetAccusation(uid);
  const { participants = [] } = useGetParticipants();

  if (!accusation || !connected) return null;

  let accusationState = 0; // Ongoing
  if(accusation.corroborations >= THRESHOLD) accusationState = 1; // Truth
  if(accusation.denials >= THRESHOLD) accusationState = 2; // Lie

  return (
    <Accusation
      key={accusation.uid}
      accusation={accusation}
      participants={participants}
      accusationState={accusationState}
      onCorroborate={() => {
        corroborate(signer, accusation);
      }}
      onDeny={() => {
        deny(signer, accusation);
      }}
    />
  );
};
