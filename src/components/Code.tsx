import React from 'react';
import { Text } from '@react-three/uikit';
import hljs from 'highlight.js';

const HighlightedCode: React.FC<{ code: string }> = ({ code }) => {
  const highlighted = hljs.highlight(code, { language: 'typescript' });
  highlighted._emitter.stack[0].children.map((token, index) => {
    if (token === '\n') {
      console.log('new line');
    } else if (token === ' ') {
      console.log('space');
    } else {
      console.log(token);
    }
  });

  return (
    highlighted._emitter.stack[0].children.map((token, index) => {
      if (typeof token === 'string') {
        return <Text key={index} color='#ffffff'>lkjsdflkjsdflkj</Text>;
      } else {
        return (
          <Text
            key={index}
            fontSize={0.2}
            color='#ffffff'
          >
            lksjdflksjdflkjsdlkfj
          </Text>
        );
      }
    })
  );
};

export default HighlightedCode;
