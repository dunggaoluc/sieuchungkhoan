import Link from "next/link";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

interface IProps {
  children: JSX.Element | string;
  onClick?(e: any): void;
  href?: string;
  className?: string;
}

const Button: React.FC<IProps> = ({ href, onClick, children, className = '' }) => {
  const buttonStyle =
    "flex flex-row items-center px-4 py-2 border-2 border-black uppercase text-sm font-semibold hover:bg-black hover:text-white transition-all group";
  const childrenStyle =
    "translate-x-3 group-hover:translate-x-0 transition-all";
  const icon = (
    <ChevronDoubleRightIcon className="w-5 h-5 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
  );

  if (href)
    return (
      <Link href={href} className={`${buttonStyle} ${className}`}>
        <span className={childrenStyle}>{children}</span>
        {icon}
      </Link>
    );
  return (
    <button onClick={(e: any) => onClick && onClick(e)} className={`${buttonStyle} ${className}`}>
      <span className={childrenStyle}>{children}</span> {icon}
    </button>
  );
};

export default Button;
