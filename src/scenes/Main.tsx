import React from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import { clamp, easeInOutMap, map } from '../lib/timing.ts';

export default function App() {
  const frame = useCurrentFrame();
  return <div className='bg-white text-black'>{frame}</div>;
}
