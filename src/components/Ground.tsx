'use client';
import React, { useEffect, useRef } from 'react';
import wrapPipe from '../../public/images/Warp_pipe.webp';
import Image from 'next/image';
function Ground() {
  const containerRef = useRef<HTMLDivElement>(null); // Define the type as HTMLDivElement

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log('dd ');

    if (event.key === 'ArrowRight') {
      // Scroll to the left by 100 pixels (adjust as needed)
      if (containerRef.current) {
        if (containerRef.current.scrollLeft !== undefined) {
          containerRef.current.scrollLeft -= 100; // Adjust scroll amount as per your requirement
        }
      }
    }
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.focus(); // Set initial focus to the container on component mount
    }
  }, []);

  const preventScroll = (event:MouseEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className='w-[3000px]  overflow-x-scroll whitespace-nowrap -mb-5 flex items-end flex-nowrap focus:outline-none'
      ref={containerRef}
      onKeyDown={(e) => handleKeyDown}
      onWheel={e=>preventScroll}
      tabIndex={0} // Required to make the div focusable for keyboard events
    >
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
      <div  id="firstRiver" className='inline-block w-[150px] h-20 bg-blue-300'></div>
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
      {/* <div className='inline-block  bg-green-600 pb-[-240px]'> */}
      <Image
        className='inline-block '
        src={wrapPipe}
        alt='wrapPipe'
        width={200}
        height={200}
      />
      {/* </div> */}
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
      <div className='inline-block w-[150px] h-20 bg-blue-300'></div>
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
      <div className='inline-block w-[500px] h-20 bg-green-600'></div>
    </div>
  );
}

export default Ground;
