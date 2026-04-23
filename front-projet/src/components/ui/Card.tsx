interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-[16px] border border-border p-6 shadow-[var(--shadow-card)] transition-all duration-150 ease-in-out ${
        hoverable ? 'hover:shadow-md hover:border-[#CBD5F5]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
