import React from 'react';
import styles from './lister.module.css';

function Lister({ arrList, activList, setIndex, subMenu, setSubMenu }) {
  return (
    <div
      className={
        subMenu
          ? `${styles.listerConteiner} ${styles.listerConteinerActiv}`
          : `${styles.listerConteiner} ${styles.listerConteinerNotActiv}`
      }
    >
      {arrList.map((e, index) => (
        <div
          key={index}
          className={
            activList === index
              ? `${styles.coneiner} ${styles.coneinerActiv}`
              : styles.coneiner
          }
          onClick={() => setIndex(index)}
        >
          <img className={styles.img} src={e.img} alt='' />
          <p>{e.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Lister;
