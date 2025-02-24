// @ts-types="npm:@types/react"
import React from 'react';
import {BrowserRouter} from 'npm:react-router';
import {Route, Routes} from 'npm:react-router-dom';

import ControlPanel from './pages/ControlPanel.tsx';

import {SocketContextProvider, useSocketContext} from './lib/socket.tsx';
import { EditorContextProvider } from './lib/EditorContext.tsx';
import Viewer from './pages/Viewer.tsx';

function App() {
  const socketContext = useSocketContext();
  return <div>ok {socketContext.connected ? 'connected' : 'not connected'}</div>
}

const WrappedApp = () => {
  return (
    <SocketContextProvider>
      <EditorContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/cp" element={<ControlPanel />} />
            <Route path="/viewer" element={<Viewer />} />
          </Routes>
        </BrowserRouter>
      </EditorContextProvider>
    </SocketContextProvider>
  );
};

export default WrappedApp;