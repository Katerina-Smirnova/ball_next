import gsap from "gsap";
import {store} from "@/app/store";
import {setText} from "@/app/features/text/textSlice";
import {gameSetting} from "@/app/ball/gameSetting";

export default function animation(spriteBall) {
    const state = store.getState();
    const data = state.data.data;
    const text = state.text.text
    const users = new Set();
    users.add(text)
    let isJumping = false;

    spriteBall.on('click', () => {
        if (isJumping) return;
        isJumping = true;
        let item
        do{
            item = data[Math.floor(Math.random() * data.length)];
        }while (users.has(item))
        users.add(item)
        let text = item.title
        gsap.timeline({onComplete:(() => isJumping = false)})
            .add(jump(spriteBall, gameSetting.GAME_HEIGHT / 2, 1, 1.6))
            .call(()=>store.dispatch(setText(text)))
    })
}

function jump(spriteBall, height, squash, time) {
    const startY = spriteBall.y;
    const baseSize = spriteBall.baseSize;
    const squashX = 0.2 * squash
    const squashY = 0.1 * squash

    return gsap.timeline()
        .to(spriteBall, {
            duration: time / 2,
            y: startY - height,
            ease: "power1.out",
        },)
        // растягиваем
        .to(spriteBall.scale, {
            duration: time / 4,
            x: baseSize * (1 - squashX),
            y: baseSize * (1 + squashY),
            ease: "sine.inOut"
        }, "<")
        // начальное
        .to(spriteBall.scale, {
            duration: time / 4,
            x: baseSize,
            y: baseSize,
            ease: "none",
        }, ">")

        .to(spriteBall, {
            duration: time / 2,
            y: startY,
            ease: "power1.in",
        })
        // растягиваем
        .to(spriteBall.scale, {
            duration: time / 4,
            x: baseSize * (1 - squashX),
            y: baseSize * (1 + squashY),
            ease: 'power1.inOut',
        }, `<+=${time / 6}`)
        //сжимаем
        .to(spriteBall.scale, {
            duration: 0.12,
            x: baseSize * (1 + squashX),
            y: baseSize * (1 - squashY),
            ease: "power2.out"
        })
        .to(spriteBall.scale, {
            duration: 0.05,
            x: baseSize,
            y: baseSize,
            ease: "power1.out"
        })
}