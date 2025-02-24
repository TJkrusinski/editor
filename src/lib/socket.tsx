import React, { createContext, useContext, useEffect, useState } from 'react';
import { SocketMessage } from '../../shared/socketMessages.ts';

export class Socket {
  url: string;
  socket: WebSocket | null;
  openCallbacks: (() => void)[];
  errorCallbacks: ((err: Event) => void)[];
  messageCallbacks: ((data: SocketMessage) => void)[];
  closeCallbacks: (() => void)[];
  queue: string[];

  constructor(url: string) {
    this.url = `ws://localhost:3000${url}`;
    this.socket = null;
    this.openCallbacks = [];
    this.errorCallbacks = [];
    this.messageCallbacks = [];
    this.closeCallbacks = [];
    this.queue = [];
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      this.openCallbacks.forEach((callback) => callback());
      // see if there is a value `socketId` in the queryString of the URL
      const url = new URL(window.location.href);
      const socketId = url.searchParams.get('socketId');
      if (socketId) {
        this.emit({ type: 'setSocketId', payload: { id: socketId } });
      }
    });

    this.socket.addEventListener('error', (err) => {
      this.errorCallbacks.forEach((callback) => callback(err));
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if ('type' in data && 'payload' in data) {
          this.messageCallbacks.forEach((callback) => callback(data));
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  onOpen(callback: () => void) {
    this.openCallbacks.push(callback);
  }

  onError(callback: (err: Event) => void) {
    this.errorCallbacks.push(callback);
  }

  send(data: string) {
    if (this.socket) {
      if (this.socket?.readyState !== WebSocket.OPEN) {
        this.queue.push(data);

        const handler = () => {
          if (this.socket?.readyState === WebSocket.OPEN) {
            this.queue.forEach((message) => this.socket?.send(message));
            this.queue = [];
            this.socket?.removeEventListener('open', handler);
          }
        };
        this.socket?.addEventListener('open', handler);
      } else {
        this.socket?.send(data);
      }
    }
  }

  onMessage(callback: (data: SocketMessage) => void) {
    this.messageCallbacks.push(callback);
  }

  onClose(callback: () => void) {
    this.closeCallbacks.push(callback);
  }

  emit(message: SocketMessage) {
    try {
      const stringMessage = JSON.stringify(message);
      this.send(stringMessage);
    } catch (err) {
      console.error(err);
    }
  }
}

const socket = new Socket('/socket');

type SocketContextType = {
  connected: boolean;
  error: string | null;
  socket: Socket;
};

const SocketContext = createContext<SocketContextType>({
  connected: false,
  error: null,
  socket,
});

export const useSocketContext = (): SocketContextType => {
  return useContext(SocketContext);
};

export const SocketContextProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [state, setState] = useState<SocketContextType>({
    connected: false,
    error: null,
    socket,
  });

  useEffect(() => {
    socket.onError((err) => {
      setState({ connected: false, error: err.toString(), socket });
    });

    socket.onOpen(() => {
      setState({ connected: true, error: null, socket });
    });

    socket.onClose(() => {
      setState({ connected: false, error: null, socket });
    });

    socket.connect();
  }, []);

  return (
    <SocketContext.Provider value={state}>
      {children}
    </SocketContext.Provider>
  );
};
