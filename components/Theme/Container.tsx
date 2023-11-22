import { cn } from "@/lib/utils";

const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("max-w-[1200px] m-auto", className)}>{children}</div>
  );
};

export default Container;
