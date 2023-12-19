type Stages = "accuse" | "accused" | "defending" | "truth" | "lie";

const imgs: Record<Stages, string> = {
  accuse: "/accuse.png",
  accused: "/accused.png",
  defending: "/defending.png",
  truth: "/truth.png",
  lie: "/lie.png",
};

export const StageImg = ({ stage }: { stage: Stages }) => {
  return <img src={imgs[stage]} alt={stage} />;
};
