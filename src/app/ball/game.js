import {Application, Container, Graphics, Sprite} from "pixi.js";
import gsap from "gsap";
import {gameSetting} from "@/app/ball/gameSetting";
import animation from "@/app/ball/animation";

export class Game {
    constructor() {
        this.app = null;
        this.world = null;
        this.land = null;
        this.spriteBall = null;
        this.destroyed = false;
    }

    async init(container) {
        this.destroyed = false;
        this.resizeHandler = this.resizeCanvas.bind(this);
        window.addEventListener("resize", this.resizeHandler);
        const app = new Application();
        await app.init({
            width: gameSetting.GAME_WIDTH,
            height: gameSetting.GAME_HEIGHT,
            backgroundAlpha: 0,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            roundPixels: true,
        });
        if (this.destroyed) {
            app.destroy(true);
            return;
        }

        this.app = app;

        container.appendChild(this.app.canvas);

        this.world = new Container()
        this.app.stage.addChild(this.world);

        this.createLand()
        const texture = gameSetting.texture
        this.createBall(texture)
        this.resizeCanvas();
    }

    destroy() {
        this.destroyed = true;
        window.removeEventListener("resize", this.resizeHandler);
        gsap.killTweensOf("*");
        if (this.spriteBall) {
            this.spriteBall.off("click");
            gsap.killTweensOf(this.spriteBall);
            this.spriteBall = null;
        }
        if (this.app) {
            this.app.destroy(true);
            this.app = null;
        }
        this.world = null;
        this.land = null;
    }
    resizeCanvas() {
        if (!this.world) return;
        const scale = Math.min((window.innerWidth / gameSetting.GAME_WIDTH)/2,( window.innerHeight / gameSetting.GAME_HEIGHT)/2);
        this.app.canvas.style.width = `${gameSetting.GAME_WIDTH * scale}px`;
        this.app.canvas.style.height = `${gameSetting.GAME_HEIGHT * scale}px`;
        this.app.canvas.style.position = "relative";
    }

    createLand() {
        this.land = new Graphics()
        this.land.rect(1, 1, gameSetting.GAME_WIDTH, gameSetting.LAND_HEIGHT).fill(gameSetting.gradient)
        this.land.position.set(0, gameSetting.GAME_HEIGHT - gameSetting.LAND_HEIGHT * 2);
        this.world.addChild(this.land);
    }

    createBall(texture) {
        this.spriteBall = new Sprite(texture)
        this.spriteBall.anchor.set(0.5, 0.5);
        this.spriteBall.pivot.set(0, this.spriteBall.height);
        const baseSize = 100 / texture.width;
        this.spriteBall.baseSize = baseSize;
        this.spriteBall.scale.set(baseSize);
        this.spriteBall.x = gameSetting.GAME_WIDTH / 2;
        this.spriteBall.y = this.land.y + Math.floor(this.spriteBall.height / 1.7);
        this.spriteBall.eventMode = 'static'
        this.world.addChild(this.spriteBall);
        animation(this.spriteBall)
    }
}