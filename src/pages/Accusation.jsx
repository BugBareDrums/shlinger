import { useParams } from "react-router-dom";
import { useGetAccusation } from "../services/getAccusations";
import { useGetParticipants } from "../services/getParticipants";
import { corroborate, deny } from "../services/makeStatement";
import { useShit } from "../useShit";

export const Accusation = () => {
  const { uid } = useParams();
  const { accusation } = useGetAccusation(uid);
  const { participants = [] } = useGetParticipants();
  const { signer } = useShit();

  return (
    <Accusation
      key={accusation.uid}
      accusation={accusation}
      participants={participants}
      onCorroborate={() => {
        corroborate(signer, accusation.uid, accusation.accused);
      }}
      onDeny={() => {
        deny(signer, accusation.uid, accusation.accused);
      }}
    />
  );
};
