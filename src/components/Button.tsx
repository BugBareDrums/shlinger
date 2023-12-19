const baseClasses = "px-4 py-2 border-2";

const variants = {
  primary: "bg-white text-black border-black",
  secondary: "bg-black text-white border-black",
  lively: "bg-yellow-400 text-black border-yellow-400",
};

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant: keyof typeof variants;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
