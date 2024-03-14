import styles from "@/componentsStyles/TextBg.module.scss";
type props = {
  className?: string;
  children: any;
  pink?: boolean;
  yellow?: boolean;
  green?: boolean;
  disabled?: boolean;
};

export default function TextBg({
  className,
  children,
  pink = false,
  yellow = false,
  green = false,
  disabled = false,
}: props) {
  return (
    <div
      className={`${styles["background"]} ${className} ${
        pink ? styles["pink"] : ""
      } ${yellow ? styles["yellow"] : ""} ${green ? styles["green"] : ""} ${
        !disabled && styles["btn"]
      }`}
    >
      <div className={styles["background__main"]}>{children}</div>
    </div>
  );
}
