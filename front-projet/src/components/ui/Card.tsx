interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
}

export function Card({ children, hoverable = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-surface rounded-[20px] p-[20px] shadow-[var(--shadow-card)] transition-all duration-200 ease-in-out ${
        hoverable ? 'hover:shadow-[var(--shadow-hover)] hover:-translate-y-[2px]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
