type ProgressBarProps = {
  current: number;
  max: number;
  variant: "good" | "bad";
};

const variantClasses = {
  good: "bg-green-400",
  bad: "bg-red-400",
};

export const Progress = ({ current, max, variant }: ProgressBarProps) => {
  return (
    <div>
      <p>
        {current} people say this is a {variant === "good" ? "true" : "false"}{" "}
        doo-doo
      </p>
      <progress
        value={current}
        max={max}
        className={`rounded w-full h-2 overflow-hidden ${variantClasses[variant]}`}
      />
    </div>
  );
};
