import styles from "./Installment.module.css";

function Installment() {
  return (
    <div className={styles.root}>
      <span className={styles.percents} data-banks="от ведущих банков">
        Рассрочка 0%
      </span>
      <div className={styles.params}>
        <span>Личный менеджер</span>
        <span>Оформление по 2-ум документам</span>
        <span>17 банков-партнеров</span>
      </div>
    </div>
  );
}

export default Installment;
