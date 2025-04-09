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
    <div
      className={`p-3 relative overflow-hidden ${
        renderBackground ? 'bg-black' : ''
      }`}
      style={{
        aspectRatio: '16 / 9',
      }}
    >
      <Main />
    </div>
  );
};

export default Viewer;
