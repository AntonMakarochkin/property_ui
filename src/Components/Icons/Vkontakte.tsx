import clsx from "clsx";

import { IconProps } from "./types";

import styles from "./Icons.module.css";

function Vkontakte({ className, style }: IconProps) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className={clsx("kit_icon", className)}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="22" fill="url(#pattern0_3_125)" />
      <defs>
        <pattern
          id="pattern0_3_125"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
          className={styles.icon_path}
        ></pattern>
        <image
          id="image0_3_125"
          width="512"
          height="512"
          className={styles.icon_path}
        />
      </defs>
    </svg>
  );
}

export default Vkontakte;
