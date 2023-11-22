import { cn } from "@/lib/utils";
import styles from "./Loader.module.css";

type LoaderProps = {
  size?: number;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ size = 48, className }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <span
        className={styles.loader}
        style={{ width: size, height: size }}
      ></span>
    </div>
  );
};

export default Loader;
