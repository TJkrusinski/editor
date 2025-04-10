import React, { useLayoutEffect, useMemo, useRef } from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { map } from '../lib/timing.ts';

type Vertex3D = {
  x: number;
  y: number;
  z: number;
};

type Vertex2D = {
  x: number;
  y: number;
};

const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: Vertex2D,
  end: Vertex2D,
) => {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.stroke();
};

const projectLine = (
  v: Vertex3D,
  distance: number,
  origin: Vertex2D,
): Vertex2D => {
  const scale = distance / (distance + v.z);
  return {
    x: v.x * scale + origin.x,
    y: v.y * scale + origin.y,
  };
};

function rotateVertex(
  v: Vertex3D,
  angles: { x: number; y: number; z: number },
): Vertex3D {
  let { x, y, z } = v;
  const { cos, sin } = Math;

  // the angles are coming in as degrees, so we need to convert them to radians
  angles.x = (angles.x * Math.PI) / 180;
  angles.y = (angles.y * Math.PI) / 180;
  angles.z = (angles.z * Math.PI) / 180;

  // Rotate around X
  const y1 = y * cos(angles.x) - z * sin(angles.x);
  const z1 = y * sin(angles.x) + z * cos(angles.x);
  y = y1;
  z = z1;

  // Rotate around Y
  const x1 = x * cos(angles.y) + z * sin(angles.y);
  const z2 = -x * sin(angles.y) + z * cos(angles.y);
  x = x1;
  z = z2;

  // Rotate around Z
  const x2 = x * cos(angles.z) - y * sin(angles.z);
  const y2 = x * sin(angles.z) + y * cos(angles.z);
  x = x2;
  y = y2;

  return { x, y, z };
}

const ROOM_TOP_LINE_Y = -700;
const ROOM_BOTTOM_LINE_Y = 700;

const ROOM_LINES_Z = 1000;
const ROOM_LINES_Z_FOREGROUND = -9000;

const ROOM_LEFT_LINE_X = -1000;
const ROOM_RIGHT_LINE_X = 1000;

const NUM_HOR_LINES = 10;
const NUM_VERT_LINES = 10;

const ORIGIN: Vertex2D = {
  x: 1920,
  y: 1080,
};

const HoloDeck: React.FC<
  { width: number; height: number; angle: number; depth: number }
> = (
  { width, height, angle, depth },
) => {
  const frame = useCurrentFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const lines = useMemo(() => {
    const CEILING_VERT: Array<[Vertex3D, Vertex3D]> = Array.from(
      { length: NUM_VERT_LINES },
      (_, i) => {
        const x = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_LEFT_LINE_X,
          ROOM_RIGHT_LINE_X,
        );
        const y = ROOM_TOP_LINE_Y;
        return [{
          x,
          y,
          z: ROOM_LINES_Z_FOREGROUND,
        }, {
          x,
          y,
          z: ROOM_LINES_Z,
        }];
      },
    );

    const CEILING_HOR = Array.from(
      { length: NUM_HOR_LINES },
      (_, i) => {
        const z = map(i, 0, NUM_HOR_LINES, ROOM_LINES_Z, -9000);
        const y = ROOM_TOP_LINE_Y;
        const x1 = ROOM_LEFT_LINE_X;
        const x2 = ROOM_RIGHT_LINE_X;

        return [{
          x: x1,
          y,
          z,
        }, {
          x: x2,
          y,
          z,
        }];
      },
    );

    const FLOOR_VERT: Array<[Vertex3D, Vertex3D]> = Array.from(
      { length: NUM_VERT_LINES },
      (_, i) => {
        const x = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_LEFT_LINE_X,
          ROOM_RIGHT_LINE_X,
        );
        const y = ROOM_BOTTOM_LINE_Y;
        return [{
          x,
          y,
          z: ROOM_LINES_Z_FOREGROUND,
        }, {
          x,
          y,
          z: ROOM_LINES_Z,
        }];
      },
    );

    const FLOOR_HOR = Array.from(
      { length: NUM_HOR_LINES },
      (_, i) => {
        const z = map(i, 0, NUM_HOR_LINES, ROOM_LINES_Z, -9000);
        const y = ROOM_BOTTOM_LINE_Y;
        const x1 = ROOM_LEFT_LINE_X;
        const x2 = ROOM_RIGHT_LINE_X;

        return [{
          x: x1,
          y,
          z,
        }, {
          x: x2,
          y,
          z,
        }];
      },
    );

    const LEFT_WALL_VERT = Array.from(
      { length: NUM_VERT_LINES },
      (_, i) => {
        const y = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_BOTTOM_LINE_Y,
          ROOM_TOP_LINE_Y,
        );
        const x = ROOM_LEFT_LINE_X;
        return [{
          x,
          y,
          z: ROOM_LINES_Z_FOREGROUND,
        }, {
          x,
          y,
          z: ROOM_LINES_Z,
        }];
      },
    );

    const LEFT_WALL_HOR = Array.from(
      { length: NUM_HOR_LINES },
      (_, i) => {
        const z = map(
          i,
          0,
          NUM_HOR_LINES,
          ROOM_LINES_Z,
          ROOM_LINES_Z_FOREGROUND,
        );
        const y1 = ROOM_BOTTOM_LINE_Y;
        const y2 = ROOM_TOP_LINE_Y;
        const x = ROOM_LEFT_LINE_X;

        return [{
          x,
          y: y1,
          z,
        }, {
          x,
          y: y2,
          z,
        }];
      },
    );

    const RIGHT_WALL_VERT = Array.from(
      { length: NUM_VERT_LINES },
      (_, i) => {
        const z = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_LINES_Z,
          ROOM_LINES_Z_FOREGROUND,
        );
        return [{
          x: ROOM_RIGHT_LINE_X,
          y: ROOM_BOTTOM_LINE_Y,
          z,
        }, {
          x: ROOM_RIGHT_LINE_X,
          y: ROOM_TOP_LINE_Y,
          z,
        }];
      },
    );

    const RIGHT_WALL_HOR = Array.from(
      { length: NUM_HOR_LINES + 1 },
      (_, i) => {
        const y = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_BOTTOM_LINE_Y,
          ROOM_TOP_LINE_Y,
        );
        const x = ROOM_RIGHT_LINE_X;

        return [{
          x,
          y: y,
          z: ROOM_LINES_Z,
        }, {
          x,
          y: y,
          z: ROOM_LINES_Z_FOREGROUND,
        }];
      },
    );

    const REAR_WALL_VERT = Array.from(
      { length: NUM_VERT_LINES },
      (_, i) => {
        const x = map(
          i,
          0,
          NUM_VERT_LINES,
          ROOM_LEFT_LINE_X,
          ROOM_RIGHT_LINE_X,
        );
        return [{
          x,
          y: ROOM_TOP_LINE_Y,
          z: ROOM_LINES_Z,
        }, {
          x,
          y: ROOM_BOTTOM_LINE_Y,
          z: ROOM_LINES_Z,
        }];
      },
    );

    const REAR_WALL_HOR = Array.from(
      { length: NUM_HOR_LINES },
      (_, i) => {
        const y = map(i, 0, 10, ROOM_TOP_LINE_Y, ROOM_BOTTOM_LINE_Y);
        return [{
          x: ROOM_LEFT_LINE_X,
          y,
          z: ROOM_LINES_Z,
        }, {
          x: ROOM_RIGHT_LINE_X,
          y,
          z: ROOM_LINES_Z,
        }];
      },
    );

    return [
      ...CEILING_VERT,
      ...CEILING_HOR,
      ...FLOOR_HOR,
      ...FLOOR_VERT,
      ...LEFT_WALL_VERT,
      ...LEFT_WALL_HOR,
      ...RIGHT_WALL_VERT,
      ...RIGHT_WALL_HOR,
      ...REAR_WALL_HOR,
      ...REAR_WALL_VERT,
    ];
  }, [height, width]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    lines.forEach((line) => {
      const start = line[0];
      const end = line[1];

      if (start && end) {
        const rotatedStart = rotateVertex(start, {
          x: 0,
          y: angle,
          z: 0,
        });

        const rotatedEnd = rotateVertex(end, {
          x: 0,
          y: angle,
          z: 0,
        });

        const projectedStart = projectLine(rotatedStart, depth, ORIGIN);
        const projectedEnd = projectLine(rotatedEnd, depth, ORIGIN);

        drawLine(ctx, projectedStart, projectedEnd);
      }
    });
  }, [width, height, frame, angle, depth]);

  return (
    <div
      className='bg-white text-black w-full h-full'
      style={{
        backgroundImage: 'url("/noise.jpg")',
      }}
    >
      <canvas ref={canvasRef} id='foobar' className='w-full h-full'>
        {frame}
      </canvas>
    </div>
  );
};

export default HoloDeck;
