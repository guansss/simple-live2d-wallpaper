import { startUpLive2d } from '@/live2d';

let messageDOM = document.getElementById('message');

window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
    if (!messageDOM) {
        messageDOM = document.createElement('pre');
        messageDOM.id = 'message';
        document.body.appendChild(messageDOM);
    }

    messageDOM.innerText = `${error && error.toString()}
Msg: ${event}
Src: ${source}
Ln: ${lineno}
Col ${colno}`;
};

(async function main() {
    await startUpLive2d();
})();
