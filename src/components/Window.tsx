type WindowProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLDivElement>;

export const Window = ({ children, className }: WindowProps) => {
  return <div className={className}>{children}</div>;
};
