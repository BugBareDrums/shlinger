type SidebarProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLElement>;

export const Sidebar = ({ children, className, ...props }: SidebarProps) => {
  return (
    <aside className={`bg-white p-2 ${className}`} {...props}>
      {children}
    </aside>
  );
};
