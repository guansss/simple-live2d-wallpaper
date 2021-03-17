declare module '@pixi/core' {
    export { Renderer, Texture, BaseTexture } from 'pixi.js';
}

declare module '@pixi/utils' {
    import { utils } from 'pixi.js';
    export import EventEmitter = utils.EventEmitter;
    export import url = utils.url;
}

declare module '@pixi/app' {
    export { Application } from 'pixi.js';
}

declare module '@pixi/ticker' {
    export { Ticker, TickerPlugin } from 'pixi.js';
}

declare module '@pixi/display' {
    export { DisplayObject, Container } from 'pixi.js';
}

declare module '@pixi/filter-*' {
    import { filters } from 'pixi.js';
    export import AlphaFilter = filters.AlphaFilter;
    export import NoiseFilter = filters.NoiseFilter;
}

declare module '@pixi/sprite' {
    export { Sprite } from 'pixi.js';
}

declare module '@pixi/graphics' {
    export { Graphics } from 'pixi.js';
}

declare module '@pixi/text' {
    export { Text, TextStyle } from 'pixi.js';
}

declare module '@pixi/extract' {
    export { Extract } from 'pixi.js';
}

declare module '@pixi/settings' {
    export { settings } from 'pixi.js';
}

declare module '@pixi/interaction' {
    export { InteractionEvent, InteractionManager } from 'pixi.js';
}

declare module '@pixi/math' {
    export { Matrix, Point, ObservablePoint, Rectangle, Bounds, Transform } from 'pixi.js';
}
