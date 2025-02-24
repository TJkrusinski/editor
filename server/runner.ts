import { EditorState } from '../shared/editorState.ts';
import { Browser } from './puppeteer.ts';
import log from './lib/logging.ts';

const paddLeft = (num: number, size: number) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

class Runner {
  browser: Browser;
  editorState: EditorState;
  socket: WebSocket | null;
  socketId: string;

  constructor(socketId: string) {
    this.browser = new Browser(socketId);
    this.editorState = {
      width: 3840,
      height: 2160,
      length: 360,
      frame: 1,
    };
    this.socket = null;
    this.socketId = socketId;
  }

  async startBrowser() {
    await this.browser.create();
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  async run() {
    for (let i = 1; i < this.editorState.length; i++) {
      this.editorState.frame = i;
      if (this.socket) {
        this.socket.send(JSON.stringify({
          type: 'setEditorState',
          payload: this.editorState,
        }));
        await this.frame(
          paddLeft(i, this.editorState.length.toString().length),
        );
      }
    }
  }

  async frame(num: string) {
    await this.browser.screenshot(`frame-${num}.png`);
    log('info', `screenshot taken for frame ${num}`);
  }
}

export default Runner;
