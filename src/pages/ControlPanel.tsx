import React, { useLayoutEffect, useState } from 'react';
import { useSocketContext } from '../lib/socket.tsx';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import { TransparentButton } from '../components/Button.tsx';
import Viewer from './Viewer.tsx';
import useInterval from '../hooks/useInterval.ts';

const Pause = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      >
      </path>
    </svg>
  );
};

const Play = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      >
      </path>
    </svg>
  );
};

const Reset = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      >
      </path>
    </svg>
  );
};

const TransportBack = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1.94976 2.74989C1.94976 2.44613 2.196 2.19989 2.49976 2.19989C2.80351 2.19989 3.04976 2.44613 3.04976 2.74989V7.2825C3.0954 7.18802 3.17046 7.10851 3.26662 7.05776L12.2666 2.30776C12.4216 2.22596 12.6081 2.23127 12.7582 2.32176C12.9083 2.41225 13 2.57471 13 2.74995V12.25C13 12.4252 12.9083 12.5877 12.7582 12.6781C12.6081 12.7686 12.4216 12.7739 12.2666 12.6921L3.26662 7.94214C3.17046 7.89139 3.0954 7.81188 3.04976 7.7174V12.2499C3.04976 12.5536 2.80351 12.7999 2.49976 12.7999C2.196 12.7999 1.94976 12.5536 1.94976 12.2499V2.74989ZM4.57122 7.49995L12 11.4207V3.5792L4.57122 7.49995Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      >
      </path>
    </svg>
  );
};

const TransportForward = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.0502 2.74989C13.0502 2.44613 12.804 2.19989 12.5002 2.19989C12.1965 2.19989 11.9502 2.44613 11.9502 2.74989V7.2825C11.9046 7.18802 11.8295 7.10851 11.7334 7.05776L2.73338 2.30776C2.5784 2.22596 2.3919 2.23127 2.24182 2.32176C2.09175 2.41225 2 2.57471 2 2.74995V12.25C2 12.4252 2.09175 12.5877 2.24182 12.6781C2.3919 12.7686 2.5784 12.7739 2.73338 12.6921L11.7334 7.94214C11.8295 7.89139 11.9046 7.81188 11.9502 7.7174V12.2499C11.9502 12.5536 12.1965 12.7999 12.5002 12.7999C12.804 12.7999 13.0502 12.5536 13.0502 12.2499V2.74989ZM3 11.4207V3.5792L10.4288 7.49995L3 11.4207Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      >
      </path>
    </svg>
  );
};

const ControlPanel = () => {
  const socketContext = useSocketContext();
  const editorContext = useEditorContext();
  const currentFrame = useCurrentFrame();

  const [playing, setPlaying] = useState<boolean>(false);
  const [size, setSize] = useState<{ scale: number }>({
    scale: 1,
  });

  useInterval(() => {
    if (playing) {
      editorContext.incrementFrame();
    }
  }, playing ? 1000 / 60 : null);

  useLayoutEffect(() => {
    const bodyRec = document.body.getBoundingClientRect();
    const { width, height } = bodyRec;

    const scaleFactor = width / editorContext.width * .9;

    setSize({
      scale: scaleFactor * 100,
    });
  }, []);

  return (
    <div
      className='p-3 bg-black relative'
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div className='flex flex-col justify-between h-full w-full'>
        <div
          className='border border-neutral-300'
          style={{
            aspectRatio: '16 / 9',
            width: '90vw',
          }}
        >
          <Viewer
            renderBackground
            scale={size.scale}
          />
        </div>
        <div className='p-3 bg-neutral-900 text-neutral-400'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-3 items-center py-3'>
              <TransparentButton
                onClick={() => {
                  setPlaying(false);
                  editorContext.setFrame(1);
                }}
              >
                <Reset />
              </TransparentButton>
              <TransparentButton
                onClick={() => {
                  editorContext.decrementFrame();
                }}
              >
                <TransportBack />
              </TransparentButton>
              <TransparentButton
                onClick={() => {
                  setPlaying(!playing);
                }}
              >
                {playing ? <Pause /> : <Play />}
              </TransparentButton>
              <TransparentButton
                onClick={() => {
                  editorContext.incrementFrame();
                }}
              >
                <TransportForward />
              </TransparentButton>
            </div>
            <div>
              <TransparentButton
                className='font-mono text-xs'
                onClick={() => {
                  socketContext.socket.emit({
                    type: 'runRunner',
                    payload: { id: 'foobar' },
                  });
                }}
              >
                Export
              </TransparentButton>
            </div>
          </div>
          <div>
            <div className='flex gap-3 items-center py-3 font-mono text-sm'>
              <div>Current Frame: {currentFrame}</div>
              <div>Length: {editorContext.length} frames</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
