type WindowProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLDivElement>;

export const Window = ({ children, className }: WindowProps) => {
  return <div className={`bg-white p-4 ${className}`}>{children}</div>;
};
