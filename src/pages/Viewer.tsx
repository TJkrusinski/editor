import React, { useEffect, useMemo, useRef, useState } from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import Main from '../scenes/Main.tsx';

function saveArrayBuffer(
  buffer: Uint8Array<ArrayBufferLike>,
  filename: string,
) {
  const blob = new Blob([buffer], { type: 'image/x-exr' });
  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

const Viewer: React.FC<
  {
    renderBackground?: boolean;
    scale: number;
  }
> = (
  { renderBackground, scale },
) => {
  const editorContext = useEditorContext();
  const currentFrame = useCurrentFrame();

  return (
    <div className='bg-white'>
      <div
        className='relative overflow-hidden'
        style={{
          aspectRatio: '16 / 9',
          backgroundImage:
            `linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
                          linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      >
        <Main />
      </div>
    </div>
  );
};

export default Viewer;
