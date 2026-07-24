import gsap from "gsap";
import {store} from "@/app/store";
import {setText} from "@/app/features/text/textSlice";
import {gameSetting} from "@/app/ball/gameSetting";

export default function animation(spriteBall, timeline){
    const state = store.getState();
    const data = state.data.data
    const texts = [];
    while (texts.length < data.length) {
        const item = data[Math.floor(Math.random() * data.length)];
        if (!texts.includes(item.title)) {
            texts.push(item.title);
        }
    }
    texts.forEach((text) => {
        timeline.call(() => {
            store.dispatch(setText(text));
        });
        timeline.add(jump(spriteBall, gameSetting.GAME_HEIGHT / 2, 1, 1.6));
    });
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