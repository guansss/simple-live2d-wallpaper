import { Live2DModel } from 'pixi-live2d-display';
import { getConfig } from './config';

export async function updateLayout(model: Live2DModel, containerWidth: number, containerHeight: number) {
    const config = await getConfig();

    if (!config.layout) {
        return;
    }

    if (config.layout.width !== undefined) {
        model.scale.set(parseLayoutValue(config.layout.width, containerWidth) / model.internalModel.originalWidth);
    }

    if (config.layout.height !== undefined) {
        model.scale.set(parseLayoutValue(config.layout.height, containerHeight) / model.internalModel.originalHeight);
    }

    if (config.layout.x !== undefined) {
        model.x = parseLayoutValue(config.layout.x, containerWidth - model.width);
    } else {
        if (config.layout.left !== undefined) {
            model.x = parseLayoutValue(config.layout.left, containerWidth);
        }

        if (config.layout.right !== undefined) {
            model.x = containerWidth - parseLayoutValue(config.layout.right, containerWidth);
        }
    }

    if (config.layout.y !== undefined) {
        model.y = parseLayoutValue(config.layout.y, containerHeight - model.height);
    } else {
        if (config.layout.top !== undefined) {
            model.y = parseLayoutValue(config.layout.top, containerHeight);
        }

        if (config.layout.bottom !== undefined) {
            model.y = containerHeight - model.height - parseLayoutValue(config.layout.bottom, containerHeight);
        }
    }
}

function parseLayoutValue(value: string | number, max: number) {
    if (!isNaN(value as number)) {
        return Number(value);
    } else if ((value as string).endsWith('%')) {
        return max * Number((value as string).replace('%', '')) / 100;
    }

    return 0;
}
