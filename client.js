import Nullstack from 'nullstack';
import Application from './src/Application';
import dialogPolyfill from 'dialog-polyfill';
import "dialog-polyfill/dialog-polyfill.css";

const context = Nullstack.start(Application);

context.start = async function start() {
  // https://nullstack.app/application-startup
}

window.dialogPolyfill = dialogPolyfill;

export default context;
