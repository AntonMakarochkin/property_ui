import clsx from "clsx";
import styles from "./PageFloatAdd.module.css";
import { LogoTelegram } from "../../Components/Icons";
import FormFloatAdd from "../../Containers/FormFloatAdd";

function PageFloatAdd() {

  return (
    <div className={clsx(styles.root)}>
      <section className={styles.info}>
        <div className={styles.brand}>
          <span className={styles.name}>Turkey Antalya Homes</span>
          <span>Поддержка</span>
          <span>Квартиры</span>
          <span>Контакты</span>
          <LogoTelegram className={styles.telegram} />
        </div>
        <div className={styles.text}>
          <span className={styles.double_column}>Все новостройки</span>
          <img src="src\assets\LogoTurkey.png" alt="" />
          <span>Турции от застройщика</span>
        </div>
      </section>
      <FormFloatAdd />
    </div>
  );
}

export default PageFloatAdd;
