'use client';
import Ground from '@/components/Ground';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import marioStaticImg from '../../public/images/mario-img.png';
import marioGIFImg from '../../public/images/mario.gif';
import flag1 from '../../public/images/flag-1.png';
import flag2 from '../../public/images/flag-2.png';
import GameOver from '@/components/GameOver';

export default function Home() {
  const [marioImg, setMarioImg] = useState(marioStaticImg);
  const [flag, setFlag] = useState(flag1);
  const [gameOverStatus, setGameOverStatus] = useState<boolean>(false);
  const marioXAxis = useRef<number>(0);
  const marioYAxis = useRef<number>(0);
  const alreadyUp = useRef<boolean>(false);
  const clearTime = useRef<NodeJS.Timeout | string>('');

  const gameOver = (mario: HTMLElement | null) => {
    let firstRiver = document.getElementById('firstRiver');
    if (marioXAxis.current > 290 && marioXAxis.current < 420) {
      setGameOverStatus(true);
    }
    console.log('gameemm', marioXAxis.current, firstRiver?.offsetLeft);
  };

  const runMario = (event: KeyboardEvent) => {
    if (!gameOverStatus) {
      clearTimeout(clearTime.current);
      if (
        event.key === 'ArrowRight' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      ) {
        let mario = document.getElementById('mario');
        // gameOver(mario);
        if (event.key === 'ArrowRight') {
          setMarioImg(marioGIFImg);
          if (mario) {
            mario.style.transition = 'transform 0.3s ease';
            if (marioXAxis.current >= 2600) {
              setFlag(flag2);
              mario.style.display = 'none';
            } else {
              marioXAxis.current += 60;
              mario.style.transform = `translateY(${marioYAxis.current}px) translateX(${marioXAxis.current}px) `;
            }
          }
        } else if (event.key === 'ArrowLeft') {
          setMarioImg(marioGIFImg);
          let mario = document.getElementById('mario');
          if (mario) {
            mario.style.transition = 'transform 0.3s ease-in-out';
            marioXAxis.current > 0
              ? (marioXAxis.current -= 60)
              : (marioXAxis.current = 0);
            mario.style.transform = `translateY(${marioYAxis.current}px) translateX(${marioXAxis.current}px) `;
          }
        } else if (event.key === 'ArrowUp' && !alreadyUp.current) {
          setMarioImg(marioGIFImg);
          alreadyUp.current = true;
          let mario = document.getElementById('mario');
          if (mario) {
            mario.style.transition = 'transform 0.3s ease-in-out';
            marioYAxis.current = -200;
            mario.style.transform = `translateY(${marioYAxis.current}px) translateX(${marioXAxis.current}px) `;
            setTimeout(() => {
              marioYAxis.current = 0;
              mario!.style.transform = `translateY(${marioYAxis.current}px) translateX(${marioXAxis.current}px) `;
            }, 400);
            setTimeout(() => {
              alreadyUp.current = false;
            }, 1000);
          }
        }
        clearTime.current = setTimeout(() => {
          setMarioImg(marioStaticImg);
        }, 100);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', runMario);
    // document.body.style.overflow = 'hidden';
  }, []);

  const preventScroll = (event: any) => {
    event.preventDefault();
  };

  return (
    <main
      className={`w-[${gameOverStatus ? '100%' : '3000px'}] bg-[#00bfea] bg-[url('https://img.freepik.com/free-vector/arcade-game-world-pixel-scene_24640-45908.jpg?size=626&ext=jpg&ga=GA1.1.1467146150.1703093412&semt=ais')] bg-repeat-x  h-screen flex ${
        gameOverStatus ? 'items-center' : 'items-end'
      }`}
      style={{ backgroundPositionY: 'bottom' }}
      onWheel={(e) => preventScroll(e)}
    >
      {!gameOverStatus ? (
        <div className='flex flex-col items-start justify-start w-full'>
          <div className='flex flex-col items-start justify-between w-full'>
            <div id='mario' className='ml-[50px] mb-[-598px]'>
              <Image src={marioImg} alt='mario' width={100} height={100} />
            </div>
            <div className='ml-[2700px] mb-[-128px]'>
              <Image src={flag} alt='flag1' height={600} />
            </div>
          </div>
          <Ground />
        </div>
      ) : (
        <GameOver  />
      )}
      {/* Your content here */}
    </main>
  );
}
