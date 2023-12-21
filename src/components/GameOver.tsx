import React, { useState } from 'react';

function GameOver() {
  return (
    <div
      className={`w-96 h-80 bg-green-500 text-[50px] text-white text-center absolute left-[35%] rounded-xl  opacity-[.6] pt-24`}
    >
      Game Over!
    </div>
  );
}

export default GameOver;
