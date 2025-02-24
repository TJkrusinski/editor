import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocketContext } from './socket.tsx';

import { EditorState } from '../../shared/editorState.ts';

type EditorContextType = EditorState & {
  setFrame: (frame: number) => void;
  incrementFrame: () => void;
  decrementFrame: () => void;
  setDimentions: (height: number, width: number) => void;
};

export const EditorContext = createContext<EditorContextType>({
  frame: 1,
  height: 1920,
  width: 1080,
  length: 360,
  setFrame: () => {},
  setDimentions: () => {},
  decrementFrame: () => {},
  incrementFrame: () => {},
});

export const useEditorContext = (): EditorContextType => {
  return useContext(EditorContext);
};

export const EditorContextProvider = (
  { children }: { children: React.ReactNode },
) => {
  const socketContext = useSocketContext();
  const [state, setState] = useState<EditorState>({
    frame: 1,
    length: 360,
    height: 2160,
    width: 3840,
  });

  useEffect(() => {
    socketContext.socket.onMessage((message) => {
      switch (message.type) {
        case 'setEditorState':
          setState((state) => {
            const newState = { ...state, ...message.payload };
            return newState;
          });
          break;
        case 'setFrame':
          setState((state) => {
            const newState = { ...state, frame: message.payload.frame };
            return newState;
          });
      }
    });
  }, []);

  return (
    <EditorContext.Provider
      value={{
        ...state,
        setFrame: (frame: number) => {
          setState({ ...state, frame });
        },
        decrementFrame: () => {
          if (state.frame > 1) {
            setState((state) => {
              const newState = { ...state, frame: state.frame - 1 };
              socketContext.socket.emit({
                type: 'setEditorState',
                payload: newState,
              });
              return newState;
            });
          }
        },
        incrementFrame: () => {
          if (state.frame < state.length) {
            setState((state) => {
              const newState = { ...state, frame: state.frame + 1 };
              socketContext.socket.emit({
                type: 'setEditorState',
                payload: newState,
              });
              return newState;
            });
          } else {
            setState((state) => {
              const newState = { ...state, frame: 1 };
              socketContext.socket.emit({
                type: 'setEditorState',
                payload: newState,
              });
              return newState;
            });
          }
        },
        setDimentions: (height: number, width: number) => {
          const newState = { ...state, height, width };
          setState(newState);
          socketContext.socket.emit({
            type: 'setEditorState',
            payload: newState,
          });
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
