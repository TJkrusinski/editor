// @ts-types="npm:@types/react"
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SocketContextProvider, useSocketContext } from './lib/socket.tsx';
import { EditorContextProvider } from './lib/EditorContext.tsx';

import ControlPanel from './pages/ControlPanel.tsx';
import Viewer from './pages/Viewer.tsx';

const App = () => {
  return (
    <SocketContextProvider>
      <EditorContextProvider>
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: false,
          }}
        >
          <Routes>
            <Route path='/' element={<ControlPanel />} />
            <Route path='/viewer' element={<Viewer />} />
          </Routes>
        </BrowserRouter>
      </EditorContextProvider>
    </SocketContextProvider>
  );
};

export default App;
