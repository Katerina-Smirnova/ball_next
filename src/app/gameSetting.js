import {Assets, FillGradient} from "pixi.js";

export const gameSetting = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    LAND_HEIGHT: 100,
    gradient: new FillGradient({
        type: 'linear',
        colorStops: [
            {offset: 0, color: '#228B22'},
            {offset: 0.3, color: '#8B4513'},
            {offset: 1, color: '#5C3317'}
        ],
    }),
    texture: Assets.load('/ball.png'),
}
