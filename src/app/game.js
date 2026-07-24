import {Application, Container, Graphics, Sprite,} from "pixi.js";
import gsap from "gsap";
import {gameSetting} from "@/app/gameSetting";

export class Game {
    constructor(props) {
        this.app = null;
        this.world = null;
        this.land = null;
        this.spriteBall = null;
        this.isJumping = false;
    }
    async init(container) {
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });

        this.app = new Application();
        await this.app.init({
            width: gameSetting.GAME_WIDTH,
            height: gameSetting.GAME_HEIGHT,
            background: 0x1a1a2e,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            roundPixels: true,
        });
        container.appendChild(this.app.canvas);

        this.world = new Container()
        this.app.stage.addChild(this.world);

        this.createLand()
        const texture = await gameSetting.texture
        this.createBall(texture)
        this.resizeCanvas();
    }

    resizeCanvas() {
        if (!this.world) return;
        const scale = Math.min(window.innerWidth / gameSetting.GAME_WIDTH, window.innerHeight / Game.GAME_HEIGHT);
        this.app.canvas.style.width = `${gameSetting.GAME_WIDTH * scale}px`;
        this.app.canvas.style.height = `${gameSetting.GAME_HEIGHT * scale}px`;
        this.app.canvas.style.position = "absolute";
        this.app.canvas.style.left = `${(window.innerWidth - gameSetting.GAME_WIDTH * scale) / 2}px`;
        this.app.canvas.style.top = `${(window.innerHeight - gameSetting.GAME_HEIGHT * scale) / 2}px`;
    }
    jump(height, squash, time) {
        const startY = this.spriteBall.y;
        const baseSize = this.spriteBall.baseSize;
        const squashX = 0.2 * squash
        const squashY = 0.1 * squash

        return gsap.timeline()
            .to(this.spriteBall, {
                duration: time / 2,
                y: startY - height,
                ease: "power1.out",
            },)
            // растягиваем
            .to(this.spriteBall.scale, {
                duration: time / 4,
                x: baseSize * (1 - squashX),
                y: baseSize * (1 + squashY),
                ease: "sine.inOut"
            }, "<")
            // начальное
            .to(this.spriteBall.scale, {
                duration: time / 4,
                x: baseSize,
                y: baseSize,
                ease: "none",
            }, ">")

            .to(this.spriteBall, {
                duration: time / 2,
                y: startY,
                ease: "power1.in",
            })
            // растягиваем
            .to(this.spriteBall.scale, {
                duration: time / 4,
                x: baseSize * (1 - squashX),
                y: baseSize * (1 + squashY),
                ease: 'power1.inOut',
            }, `<+=${time / 6}`)
            //сжимаем
            .to(this.spriteBall.scale, {
                duration: 0.12,
                x: baseSize * (1 + squashX),
                y: baseSize * (1 - squashY),
                ease: "power2.out"
            })
            .to(this.spriteBall.scale, {
                duration: 0.05,
                x: baseSize,
                y: baseSize,
                ease: "power1.out"
            })
    }
    createLand(){
        this.land = new Graphics()
        this.land.rect(1, 1, gameSetting.GAME_WIDTH, gameSetting.LAND_HEIGHT).fill(gameSetting.gradient)
        this.land.position.set(0, gameSetting.GAME_HEIGHT - gameSetting.LAND_HEIGHT);
        this.world.addChild(this.land);
    }
    createBall(texture){
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

        this.spriteBall.on('click', () => {
            if (this.isJumping) return;
            this.isJumping = true;
            gsap.timeline()
                .add(this.jump(gameSetting.GAME_HEIGHT / 2, 1, 1.6))
                .add(this.jump(gameSetting.GAME_HEIGHT / 4, 0.7, 1))
                .add(this.jump(gameSetting.GAME_HEIGHT / 8, 0.5, 0.8))
                .call(() => {
                    this.isJumping = false;
                });
        });
    }
}