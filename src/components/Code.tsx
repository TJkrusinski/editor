import React from 'react';
import { Container, Text } from '@react-three/uikit';
import hljs from 'highlight.js';
import * as THREE from 'three';

const HighlightedCode: React.FC<{ code: string }> = ({ code }) => {
  const highlighted = hljs.highlight(code, { language: 'typescript' });

  return (
    <Container flexDirection='row' gap={0.2}>
      {highlighted._emitter.stack[0].children.map((token, index) => {
        if (typeof token === 'string') {
          return (
            <Text
              key={index}
              color={new THREE.Color(0, 0, 0)}
              fontFamily='mono'
            >
              {token}
            </Text>
          );
        } else if (
          typeof token === 'object' && 'children' in token &&
          Array.isArray(token.children)
        ) {
          return (
            <Text
              key={index}
              fontSize={24}
              fontFamily='mono'
              color={new THREE.Color(0, 0, 0)}
            >
              {token.children[0]}
            </Text>
          );
        } else {
          return (
            <Text
              key={index}
              fontSize={24}
              fontFamily='mono'
              color={new THREE.Color(0, 0, 0)}
            >
              {token.children[0].value}
            </Text>
          );
        }
      })}
    </Container>
  );
};

export default HighlightedCode;
