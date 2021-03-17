import { getConfig } from '@/config';
import { Application } from '@pixi/app';
import { Renderer } from '@pixi/core';
import { InteractionManager } from '@pixi/interaction';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { Live2DModel } from 'pixi-live2d-display';
import { updateLayout } from './layout';

// register the Ticker to support automatic updating of Live2D models
Application.registerPlugin(TickerPlugin as any);
Live2DModel.registerTicker(Ticker);

// register the InteractionManager to support automatic interaction of Live2D models
Renderer.registerPlugin('interaction', InteractionManager as any);

export async function startUpLive2d() {
    const config = await getConfig();

    const app = new Application({
        view: document.getElementById('canvas') as HTMLCanvasElement,
        resizeTo: window,
        transparent: true,
    });

    const model = await Live2DModel.from(config.model);

    const resize = (width: number, height: number) => {
        updateLayout(model, width, height);
    };

    // initial resizing
    resize(app.renderer.width, app.renderer.height);

    // subscribe to the app's resizing
    (app.renderer as any).runners.resize.add({ resize });

    app.stage.addChild(model);
}
