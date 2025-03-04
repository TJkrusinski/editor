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
  const foo = <HighlightedCode code={`console.log('hello world');`} />;

  return (
    <>
      <Container flexDirection='row' width={3840} height={200} marginTop={30}>
        <Text color='white'>ok</Text>
        <HighlightedCode
          code={`
const parseHighlightedCode = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;

  return Array.from(div.children).map((span) => ({
    text: span.textContent || '',
    color: span.getAttribute('style')?.match(/color:\s*(#[0-9a-fA-F]+)/)?.[1] ||
      'white',
  }));
};
        `}
        />
      </Container>
      <Container
        flexDirection='column'
        width={3840}
        height={200}
        marginTop={mappedTop}
        backgroundColor='#ff0000'
        padding={32}
      >
        <Text
          fontWeight='semi-bold'
          letterSpacing={-0.4}
          fontSize={38}
          lineHeight={38}
          color='#ffffff'
        >
          TJ Krusinski
        </Text>
        <Text
          fontSize={30}
          lineHeight={20}
          color='#ffffff'
        >
          Principal Software Engineer
        </Text>
      </Container>
    </>
  );
};
