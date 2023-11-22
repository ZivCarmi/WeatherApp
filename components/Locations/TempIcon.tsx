import { cn } from "@/lib/utils";
import styles from "./TempIcon.module.css";

type TempIconProps = {
  icon: number;
  className?: string;
};

const TempIcon: React.FC<TempIconProps> = ({ icon, className }) => {
  const iconNumber = `icon${icon}`;

  return <i className={cn(`wi ${styles[iconNumber]}`, className)} />;
};

export default TempIcon;
