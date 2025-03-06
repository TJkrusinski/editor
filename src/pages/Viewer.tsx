import React, { useEffect, useMemo, useRef, useState } from 'react';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Container, Root, Text } from '@react-three/uikit';
import { EXRExporter } from 'three/addons/exporters/EXRExporter.js';
import { FloatType, RGBAFormat, WebGLRenderTarget } from 'three';
import * as THREE from 'three';
import App from '../scenes/Main.tsx';
import MonoFontProvider from '../components/MonoFont.tsx';

const supports = CSS.supports('color', 'color(rec2020 1 0 0)');

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

const ExportEXR = () => {
  const { gl, scene, camera, size } = useThree();
  const renderTarget = useMemo(() => {
    return new WebGLRenderTarget(size.width, size.height, {
      format: RGBAFormat,
      type: FloatType,
    });
  }, [size.width, size.height]);

  const captureRef = useRef(false);

  useFrame(() => {
    if (captureRef.current) {
      gl.setRenderTarget(renderTarget);
      gl.render(scene, camera);
      gl.setRenderTarget(null);
      saveEXR(renderTarget);
      captureRef.current = false;
    }
  });

  const saveEXR = async (target: WebGLRenderTarget) => {
    gl.readRenderTargetPixels(
      target,
      0,
      0,
      size.width,
      size.height,
      new Float32Array(size.width * size.height * 4), // Read HDR pixel data
    );

    const data = new Float32Array(size.width * size.height * 4);
    gl.readRenderTargetPixels(target, 0, 0, size.width, size.height, data);

    const exporter = new EXRExporter();

    const EXR = await exporter.parse(gl, renderTarget);

    saveArrayBuffer(EXR, 'export.exr');
  };
};

const Controller: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { gl, setFrameloop } = useThree();

  useEffect(() => {
  }, []);

  return children;
};

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
      <Canvas
        resize={{ scroll: false, offsetSize: true }}
        frameloop='demand'
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          touchAction: 'none',
          width: `${editorContext.width}px`,
          height: `${editorContext.height}px`,
          transform: `scale(${scale / 100})`,
          transformOrigin: 'top left',
        }}
        camera={{
          position: [0, 0, 18],
          fov: 35,
          zoom: 100,
        }}
        gl={{ localClippingEnabled: true }}
        orthographic
        flat
      >
        <Controller>
          <MonoFontProvider>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              decay={0}
              intensity={Math.PI}
            />
            <pointLight
              position={[-10, -10, -10]}
              decay={0}
              intensity={Math.PI}
            />
            <Root sizeX={editorContext.width} sizeY={editorContext.height}>
              <App />
            </Root>
          </MonoFontProvider>
        </Controller>
      </Canvas>
    </div>
  );
};

export default Viewer;
