import clsx from "clsx";

import { IconProps } from "./types";

import styles from "./Icons.module.css";

function Profile({ className, style }: IconProps) {
  return (
    <svg
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("kit_icon", className)}
      style={style}
    >
      <circle
        cx="9"
        cy="6"
        r="5"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeWidth="2"
        className={styles.icon_path}
      />
      <path
        d="M3 15H15C16.1046 15 17 15.8954 17 17V23H1V17C1 15.8954 1.89543 15 3 15Z"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeWidth="2"
        className={styles.icon_path}
      />
    </svg>
  );
}

export default Profile;
