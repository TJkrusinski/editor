import React, { useLayoutEffect, useRef, useState } from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import { clamp, easeInOutMap, map } from '../lib/timing.ts';
import HoloDeck from '../components/HoloDeck.tsx';

export default function App() {
  const frame = useCurrentFrame();
  const editorContext = useEditorContext();
  const width = editorContext.width;
  const height = editorContext.height;
  const [angle, setAngle] = useState<number>(0);
  const [depth, setDepth] = useState<number>(10000);

  return (
    <div>
      <div
        className='fixed top-3 left-3'
        style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      >
        <label htmlFor='angle'>Angle: {angle}</label>
        <input
          id='angle'
          step={1}
          type='range'
          min='-40'
          max='40'
          value={angle}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setAngle(value);
          }}
        />
        <label htmlFor='depth'>Depth: {depth}</label>
        <input
          id='depth'
          step={1}
          type='range'
          min='8000'
          max='15000'
          value={depth}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            setDepth(value);
          }}
        />
      </div>
      <HoloDeck width={width} height={height} angle={angle} depth={depth} />
    </div>
  );
}
