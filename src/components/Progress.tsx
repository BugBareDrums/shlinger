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
      <div className="w-full bg-gray-200 rounded h-2 dark:bg-gray-700 m-3">
        <div
          className={`rounded w-full h-2 overflow-hidden ${variantClasses[variant]}`}
          style={{ width: `${(current / max) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
