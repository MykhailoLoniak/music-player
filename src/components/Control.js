import React, { useState, useEffect } from 'react';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { TbPlaylistAdd, TbPlaylistX } from 'react-icons/tb';
import { ImNext2, ImPrevious2 } from 'react-icons/im';
import { MdOutlineVolumeOff, MdOutlineVolumeUp } from 'react-icons/md';

import styles from './control.module.css';

function Control(props) {
  const [audio, setAudio] = useState(false);
  const {
    play,
    handlePlayClick,
    audioRef,
    arrList,
    listActiv,
    index,
    setIndex,
    subMenu,
    setSubMenu,
  } = props;

  const [isPlaying, setIsPlaying] = useState(play);

  useEffect(() => {
    listActiv(index);

    const updatedElement = arrList[index];
    const updatedAudioSrc = updatedElement.audioSrc;

    audioRef.current.src = updatedAudioSrc;

    // Перевірка, чи потрібно відтворювати аудіо
    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        // Обробка помилки в разі переривання запиту на відтворення
        console.error('Play interrupted by pause:', error);
      });
    } else {
      audioRef.current.pause();
    }
  }, [index, arrList, isPlaying, audioRef]);

  function indexIncrememt() {
    if (index < arrList.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
    setIsPlaying(true); // Встановити відтворення
  }

  function decrement() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      const i = arrList.length - 1;
      setIndex(i);
    }
    setIsPlaying(true); // Встановити відтворення
  }

  const handleSubMenuClick = () => {
    setSubMenu(!subMenu);
  };
  function handleAudioClick() {
    setAudio(!audio);
    audioRef.current.muted = !audio;
  }

  const firstElement = arrList[index];
  const firstAudioSrc = firstElement.audioSrc;
  const firstImg = firstElement.img;
  const firstTitle = firstElement.title;

  return (
    <div className={styles.control}>
      <div className={styles.mainConteiner}>
        <div className={styles.img}>
          <img src={firstImg} alt={firstTitle} />
          <span>{firstTitle}</span>
        </div>
        <div className={styles.mainButtons} onClick={decrement}>
          <ImPrevious2 />
        </div>
        <div
          onClick={() => {
            handlePlayClick();
            setIsPlaying(!isPlaying);
          }}
          className={
            isPlaying
              ? `${styles.mainButtons} ${styles.notActic}`
              : `${styles.mainButtons} ${styles.playActic}`
          }
        >
          <BsFillPlayFill />
        </div>
        <div
          onClick={() => {
            handlePlayClick();
            setIsPlaying(!isPlaying);
          }}
          className={
            isPlaying
              ? `${styles.mainButtons} ${styles.playAktiv}`
              : `${styles.mainButtons} ${styles.notActic}`
          }
        >
          <BsFillPauseFill />
        </div>
        <div className={styles.mainButtons} onClick={indexIncrememt}>
          <ImNext2 />
        </div>
        <div
          onClick={handleAudioClick}
          className={audio ? styles.audioActiv : styles.audioNotActiv}
        >
          <MdOutlineVolumeOff />
        </div>
        <div
          onClick={handleAudioClick}
          className={!audio ? styles.audioActiv : styles.audioNotActiv}
        >
          <MdOutlineVolumeUp />
        </div>
        <div
          onClick={handleSubMenuClick}
          className={
            subMenu
              ? `${styles.sub_menu} ${styles.sub_menuActive}`
              : `${styles.sub_menu} ${styles.sub_menuNotActive}`
          }
        >
          <TbPlaylistAdd />
        </div>
        <div
          onClick={handleSubMenuClick}
          className={
            !subMenu
              ? `${styles.sub_menu} ${styles.sub_menuActive}`
              : `${styles.sub_menu} ${styles.sub_menuNotActive}`
          }
        >
          <TbPlaylistX />
        </div>
      </div>

      <div className={styles.mp3}>
        <div className='hhh'>
          <audio ref={audioRef} controls>
            <source src={firstAudioSrc} />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}

export default Control;
