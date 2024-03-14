import styles from "@/componentsStyles/BaseBackground.module.scss";
type props = {
  className?: string;
  children: any;
  pink?: boolean;
  blue?: boolean;
  disabled?: boolean;
};

export default function BaseBackground({
  className,
  children,
  pink = false,
  blue = false,
  disabled = false,
}: props) {
  return (
    <div
      className={`${styles["background"]} ${className} ${
        pink ? styles["pink"] : ""
      } ${blue ? styles["blue"] : ""} ${!disabled && styles["btn"]}`}
    >
      {children}
    </div>
  );
}
