import React, { useState } from 'react';
import { useSocketContext } from '../lib/socket.tsx';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import Button from '../components/Button.tsx';
import Viewer from './Viewer.tsx';
import useInterval from '../hooks/useInterval.ts';

const ControlPanel = () => {
  const socketContext = useSocketContext();
  const editorContext = useEditorContext();
  const currentFrame = useCurrentFrame();

  const [playing, setPlaying] = useState<boolean>(false);

  useInterval(() => {
    if (playing) {
      editorContext.incrementFrame();
    }
  }, playing ? 1000 / 60 : null);

  return (
    <div className='p-3 bg-gray-400'>
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center py-3'>
            <Button
              onClick={() => {
                setPlaying(false);
                editorContext.setFrame(1);
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setPlaying(!playing);
              }}
            >
              {playing ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={() => {
                editorContext.decrementFrame();
              }}
            >
              Decrement Frame
            </Button>
            <Button
              onClick={() => {
                editorContext.incrementFrame();
              }}
            >
              Increment Frame
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                socketContext.socket.emit({
                  type: 'runRunner',
                  payload: { id: 'foobar' },
                });
              }}
            >
              Record
            </Button>
          </div>
        </div>
        <div>
          <div className='flex gap-3 items-center py-3'>
            <div>Current Frame: {currentFrame}</div>
            <div>Length: {editorContext.length} frames</div>
          </div>
        </div>
        <div
          style={{
            transform: `scale(${
              window.innerWidth / editorContext.width * .8
            }) translate(-${
              window.innerWidth / editorContext.width * 1.8 * 100
            }%, -${window.innerHeight / editorContext.height * 1.7 * 100}%)`,
          }}
        >
          <Viewer />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
