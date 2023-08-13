import React, { Component, useRef, useState } from 'react';
import styles from './player.module.css';
import Control from './Control';
import Lister from './Lister';
import arrList from './arrList';

function Player() {
  const [play, setPlay] = useState(false);
  const [activList, setActivList] = useState(null);
  const [index, setIndex] = useState(0);
  const [subMenu, setSubMenu] = useState(true);

  const audioRef = useRef(null);

  const handlePlayClick = () => {
    const audioElement = audioRef.current;

    if (play) {
      audioElement.pause();
    } else {
      audioElement.play();
    }

    setPlay(!play);
  };

  function listActiv(params) {
    setActivList(params);
    console.log(activList);
  }

  return (
    <div className={styles.conteiner}>
      <Control
        play={play}
        handlePlayClick={handlePlayClick}
        arrList={arrList}
        audioRef={audioRef}
        arrList={arrList}
        listActiv={listActiv}
        index={index}
        setIndex={setIndex}
        subMenu={subMenu}
        setSubMenu={setSubMenu}
      />
      <Lister
        arrList={arrList}
        activList={activList}
        setIndex={setIndex}
        subMenu={subMenu}
        setSubMenu={setSubMenu}
      />
    </div>
  );
}

export default Player;
