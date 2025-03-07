import React from 'react';
import { FontFamilyProvider } from '@react-three/uikit';

const MonoFontProvider: React.FC<{ children: React.ReactNode }> = (
  { children },
) => {
  return (
    <FontFamilyProvider
      mono={{
        medium: '/hack/hack-mono.json',
      }}
    >
      {children}
    </FontFamilyProvider>
  );
};

export default MonoFontProvider;
