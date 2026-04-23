interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = "transition-all duration-150 ease-in-out font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-secondary text-white rounded-[10px] px-4 py-[10px] hover:bg-secondary-hover",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary px-4 py-[10px] rounded-[10px] hover:bg-[#F1F5F9]",
    danger: "bg-danger text-white rounded-[10px] px-4 py-[10px] hover:bg-red-700 shadow-sm"
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
