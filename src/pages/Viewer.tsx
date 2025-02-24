import React, { useEffect } from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';

const map = (
  value: number,
  domainStart: number,
  domainEnd: number,
  rangeStart: number,
  rangeEnd: number,
) => {
  return (
    ((value - domainStart) / (domainEnd - domainStart)) *
      (rangeEnd - rangeStart) + rangeStart
  );
};

const supports = CSS.supports('color', 'color(rec2020 1 0 0)');

const Viewer = () => {
  const editorContext = useEditorContext();
  const currentFrame = useCurrentFrame();

  const x = map(
    currentFrame,
    0,
    editorContext.length,
    0,
    editorContext.width,
  );

  const y = map(
    currentFrame,
    0,
    editorContext.length,
    0,
    editorContext.height,
  );

  return (
    <div
      className='p-3 relative overflow-hidden'
      style={{
        width: `${editorContext.width}px`,
        height: `${editorContext.height}px`,
      }}
    >
      <div>
        <div
          className=''
          style={{
            color: 'color(rec2020 1 0 0)',
          }}
        >
          viewer supports rec2020: {supports ? 'yes' : 'no'}
        </div>

        <div
          style={{
            color: `color(rec2020 0 1 0)`,
            position: 'absolute',
            top: `${y}px`,
            left: `${x}px`,
            fontSize: '100px',
          }}
        >
          {currentFrame}
        </div>

        <div
          style={{
            position: 'absolute',
            left: '400px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 1 0 0)',
          }}
        >
          red
        </div>
        <div
          style={{
            position: 'absolute',
            left: '500px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 0 1 0)',
          }}
        >
          green
        </div>
        <div
          style={{
            position: 'absolute',
            left: '600px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 0 0 1)',
          }}
        >
          blue
        </div>
        <div
          style={{
            position: 'absolute',
            left: '700px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 1 1 1)',
          }}
        >
          white
        </div>
        <div
          style={{
            position: 'absolute',
            left: '800px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 0.5 0.5 0.5)',
          }}
        >
          50% gray
        </div>
        <div
          style={{
            position: 'absolute',
            left: '900px',
            top: '400px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(rec2020 0 0 0)',
          }}
        >
          black
        </div>
        <div
          style={{
            position: 'absolute',
            left: '400px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 1 0 0)',
          }}
        >
          red
        </div>
        <div
          style={{
            position: 'absolute',
            left: '500px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 0 1 0)',
          }}
        >
          green
        </div>
        <div
          style={{
            position: 'absolute',
            left: '600px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 0 0 1)',
          }}
        >
          blue
        </div>
        <div
          style={{
            position: 'absolute',
            left: '700px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 1 1 1)',
          }}
        >
          white
        </div>
        <div
          style={{
            position: 'absolute',
            left: '800px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 0.5 0.5 0.5)',
          }}
        >
          50% gray
        </div>
        <div
          style={{
            position: 'absolute',
            left: '900px',
            top: '500px',
            width: '100px',
            height: '100px',
            backgroundColor: 'color(srgb 0 0 0)',
          }}
        >
          black
        </div>
      </div>
    </div>
  );
};

export default Viewer;
