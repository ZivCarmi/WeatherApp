import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <span className={styles.loader}></span>
    </div>
  );
};

export default Loader;
