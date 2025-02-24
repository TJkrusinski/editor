import log from './lib/logging.ts';
import { SocketMessage } from '../shared/socketMessages.ts';
import Runner from './runner.ts';

const SOCKET_ROUTE = new URLPattern({ pathname: '/socket' });
const sockets: Record<string, WebSocket> = {};

const handleMessage = async (
  thisSocketId: string,
  socket: WebSocket,
  message: SocketMessage,
) => {
  const numSockets = Object.keys(sockets).length;
  log(
    'info',
    `received message: ${message.type} from ${thisSocketId} to ${numSockets} sockets`,
  );

  switch (message.type) {
    case 'setSocketId': {
      log('info', `socket id set to ${message.payload.id}`);
      sockets[message.payload.id] = socket;
      break;
    }
    case 'runRunner': {
      log('info', `running runner`);
      const id = message.payload.id;
      const runner = new Runner(id);

      await runner.startBrowser();

      const socket = sockets[id];

      if (socket) {
        runner.setSocket(socket);
        await runner.run();
        await runner.browser.close();
      } else {
        log('error', `socket not found for id ${id}`);
      }

      break;
    }
    case 'setEditorState': {
      log('info', `editor state set`);
      for (const [id, otherSocket] of Object.entries(sockets)) {
        if (id !== thisSocketId) {
          log('info', `sending message to ${id}`);
          otherSocket.send(JSON.stringify(message));
        }
      }
      break;
    }
    case 'setFrame': {
      log('info', `frame set to ${message.payload.frame}`);
      break;
    }
  }
};

function handler(req: Request): Response {
  const match = SOCKET_ROUTE.exec(req.url);

  if (match) {
    if (req.headers.get('upgrade') !== 'websocket') {
      return new Response('Not a websocket request', {
        status: 400,
      });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    const id = Math.random().toString(36).slice(2);

    sockets[id] = socket;

    socket.addEventListener('open', () => {
      log('info', 'socket opened');
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        if ('type' in data && 'payload' in data) {
          handleMessage(id, socket, data);
        }
      } catch (e) {
        log('error', `failed to parse message: ${e}`);
      }
    });

    socket.addEventListener('close', () => {
      log('info', 'socket closed');
      delete sockets[id];
    });

    return response;
  }

  return new Response('Not found', {
    status: 404,
  });
}

Deno.serve({ port: 3001 }, handler);
