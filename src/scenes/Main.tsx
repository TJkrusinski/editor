import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Container,
  DefaultProperties,
  Fullscreen,
  Text,
} from '@react-three/uikit';
import useCurrentFrame from '../hooks/useCurrentFrame.ts';
import { useEditorContext } from '../lib/EditorContext.tsx';
import { clamp, easeInOutMap, map } from '../lib/timing.ts';
import HighlightedCode from '../components/Code.tsx';
import * as THREE from 'three';

export default function App() {
  return (
    <>
      <Fullscreen flexDirection='column' distanceToCamera={1}>
        <DefaultProperties
          scrollbarWidth={8}
          scrollbarOpacity={0.1}
          scrollbarBorderRadius={4}
        >
          <MarketPage />
        </DefaultProperties>
      </Fullscreen>
    </>
  );
}

const MarketPage: React.FC = () => {
  const frame = useCurrentFrame();
  const editorContext = useEditorContext();

  const mappedTop = easeInOutMap(frame, 60, 2160, 2160 - 200);
  const mappedOpacity = easeInOutMap(frame, 60, 0, 1);

  return (
    <>
      <Container
        flexDirection='column'
        width={2000}
        height={1000}
        backgroundColor={new THREE.Color(1, 1, 1)}
      >
        <HighlightedCode code={`console.log("foo")`} />
      </Container>
      <Container
        flexDirection='column'
        width={3840}
        height={200}
        marginTop={mappedTop - 1000}
        backgroundColor={new THREE.Color(1, 1, 1)}
        padding={32}
      >
        <Container flexDirection='column' gap={16}>
          <Text
            fontWeight='semi-bold'
            letterSpacing={-0.2}
            fontSize={38}
            lineHeight={42}
            color={new THREE.Color(0, 0, 0)}
          >
            TJ Krusinski
          </Text>
          <Text
            fontSize={30}
            lineHeight={20}
            marginTop={4}
            color={new THREE.Color(0, 0, 0)}
          >
            Principal Software Engineer
          </Text>
        </Container>
      </Container>
    </>
  );
};
