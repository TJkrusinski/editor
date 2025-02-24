import { EditorState } from './editorState.ts';

interface SocketMessageBase {
  type: string;
  payload: object;
}

interface SetFrameMessage extends SocketMessageBase {
  type: 'setFrame';
  payload: {
    frame: number;
  };
}

interface SetEditorState extends SocketMessageBase {
  type: 'setEditorState';
  payload: EditorState;
}

interface SetSocketId extends SocketMessageBase {
  type: 'setSocketId';
  payload: {
    id: string;
  };
}

interface RunRunner extends SocketMessageBase {
  type: 'runRunner';
  payload: {
    id: string;
  };
}

export type SocketMessage =
  | SetFrameMessage
  | SetEditorState
  | SetSocketId
  | RunRunner;
