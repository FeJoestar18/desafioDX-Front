interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = "transition-all duration-200 ease-in-out font-medium flex items-center justify-center gap-2 hover:scale-[1.02]";
  
  const variants = {
    primary: "bg-gradient-primary text-white rounded-full px-[18px] py-[10px] shadow-soft",
    ghost: "bg-transparent text-text-secondary hover:text-text-primary px-[18px] py-[10px] rounded-full hover:bg-[#F1F5F9]"
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
