type WindowProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLDivElement>;

type Stages = "accuse" | "accused" | "defending" | "truth" | "lie" | "welcome";

const imgs: Record<Stages, string> = {
  accuse: "/accuse.png",
  accused: "/accused.png",
  defending: "/defending.png",
  truth: "/truth.png",
  lie: "/lie.png",
  welcome: "/welcome.jpeg",
};

export const Img = ({ stage }: { stage: Stages }) => {
  return <img className="mb-2" src={imgs[stage]} alt={stage} />;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-lg font-bold">{children}</h2>;
};
const Subtitle = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};

export const Window = ({ children, className }: WindowProps) => {
  return (
    <div className={`text-center bg-white p-4 m-2 ${className}`}>
      {children}
    </div>
  );
};

Window.Title = Title;
Window.Subtitle = Subtitle;
Window.Img = Img;
