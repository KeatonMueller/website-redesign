/**
 *
 * =============================
 * ==== Snap SVG Animations ====
 * =============================
 *
 */

// total time (in milliseconds) for all animations to do one cycle
const ANIM_TOTAL_DUR = 12000;

// query for the svgs to animate
const waterPath = Snap.select("#water path");
const boatSvg = Snap.select(".boat");

/**
 * Key times to control animations.
 *
 * ANIM_TIMES[i] is the animation that triggers at time `i` (in milliseconds).
 * ANIM_TIMES[i].delay is the time to the next animation time.
 *
 * ANIM_TIMES[i].water contains data about the water svg. null indicates no update at that time.
 *      water.path is the water svg's new path value.
 *      water.duration is the duration it takes.
 *
 * ANIM_TIMES[i].boat contains the data about the boat svg. null indicates no update at that time.
 *      boat.yOffset is the y offset to add to the boats position, as a percentage of the viewport width.
 *      boat.rotation is the new rotation of the boat.
 *      boat.duration is the duration it takes.
 *      boat.easing is the easing used when animating.
 *
 * Note that `ANIM_TIMES[i].delay + i` should equal the subsequent key in ANIM_TIMES,
 * or ANIM_TOTAL_DUR if `i` is the last key.
 */
const ANIM_TIMES = {
    0: {
        delay: 3000,
        water: {
            path: "M1920 136.086H0V107.052C104.348 114.051 354.584 99.0533 491 65.0521C646.71 26.242 809.161 1.55241 969.5 0.0524134C1129.84 -1.44759 1261.26 29.4641 1456 65.0521C1641.5 98.9507 1816.16 113.719 1920 107.052V136.086Z",
            duration: 3000,
        },
        boat: {
            yOffset: 0.06,
            rotation: 17,
            duration: 3500,
            easing: mina.linear,
        },
    },
    3000: {
        delay: 500,
        water: {
            path: "M1920 135.759H0V55.8101C94.1675 20.3101 307.307 -10.7852 455 3.59178C624.502 20.0917 743.286 41.3531 904.5 64.3105C1071.5 88.0918 1264.56 96.8105 1459.5 96.8105C1615.81 96.8105 1811 91.3104 1920 74.3105V135.759Z",
            duration: 3000,
        },
        boat: null,
    },
    3500: {
        delay: 1500,
        water: null,
        boat: {
            yOffset: 0.06,
            rotation: 10,
            duration: 1500,
            easing: mina.linear,
        },
    },
    5000: {
        delay: 1000,
        water: null,
        boat: {
            yOffset: 0.06,
            rotation: 7,
            duration: 1500,
            easing: mina.linear,
        },
    },
    6000: {
        delay: 500,
        water: {
            path: "M1920 136H0V0.000267577C111 42.1645 181.975 51.3289 329.5 67.2779C518.5 87.7108 592.292 80.5766 786.5 91.1993C950.5 100.17 1373.5 100.668 1555.5 80.2355C1708.53 63.0547 1813 41.862 1920 0V136Z",
            duration: 3000,
        },
        boat: null,
    },
    6500: {
        delay: 2500,
        water: null,
        boat: {
            yOffset: 0,
            rotation: -2,
            duration: 5500,
            easing: mina.linear,
        },
    },
    9000: {
        delay: 3000,
        water: {
            path: "M1920 136.339H0V62C98.5 80.7826 240.789 110 412 110C566.526 110 741.993 118.565 898.5 84.3042C1076.65 45.3042 1181.79 17.0803 1511.5 2.08664C1786.37 -10.4132 1876.73 35.3036 1920 84.3042V136.339Z",
            duration: 3000,
        },
        boat: null,
    },
};

// variable to keep track of which animation to play
let animTime = 0;
// variable to store animIter timeouts
let animTimeout;

// function cycling through all the animations
const animIter = () => {
    // get the animation details from ANIM_TIMES
    const { delay, water, boat } = ANIM_TIMES[animTime];

    // trigger a water animation if not null
    if (water !== null) {
        const { path, duration } = water;
        waterPath.animate({ d: path }, duration, mina.linear);
    }

    // trigger a boat animation if not null
    if (boat !== null) {
        const { yOffset, rotation, duration, easing } = boat;
        const height = window.innerWidth * yOffset;
        const transform = `R${rotation}`; // T0,${height}
        // boatSvg.animate({ transform: transform }, duration, easing);
    }

    // update animTime and queue another animIter
    animTime = (animTime + delay) % ANIM_TOTAL_DUR;
    animTimeout = setTimeout(animIter, delay);
};

const icons = [...document.querySelectorAll(".skill-icons img")];
icons.push(document.querySelector(".boat"));

// function to initiate animation, clearing any running actions
const waterSvg = document.querySelector("#water path");
const startAnim = () => {
    waterPath.stop();
    waterSvg.setAttribute(
        "d",
        "M1920 136.339H0V62C98.5 80.7826 240.789 110 412 110C566.526 110 741.993 118.565 898.5 84.3042C1076.65 45.3042 1181.79 17.0803 1511.5 2.08664C1786.37 -10.4132 1876.73 35.3036 1920 84.3042V136.339Z"
    );

    clearTimeout(animTimeout);
    animTime = 0;
    animIter();

    // console.log(info);
    icons.forEach((icon) => {
        icon.style.animation = "none";
        void icon.offsetWidth; // trigger reflow
        icon.style.animation = null;
    });
    const boat = document.querySelector(".boat");
    boat.style.animation = "none";
    void boat.offsetWidth; // trigger reflow
    void boat.rotation;
    boat.style.animation = null;
};

// start up the animations
startAnim();

/**
 *
 * =========================
 * ==== GSAP Animations ====
 * =========================
 *
 */

// have projects fade in from below when scrolled to
// const projects = ["cube", "starbattle", "search"];
// projects.forEach((project) => {
//     gsap.from(`.project-${project}`, {
//         scrollTrigger: {
//             trigger: `.project-${project}`,
//             start: "center bottom",
//             toggleActions: "play none none reverse",
//         },
//         y: 50,
//         opacity: 0,
//         duration: 0.75,
//     });
// });

// gsap.from(".about-content", {
//     opacity: 0,
//     x: -20,
//     y: -50,
//     duration: 1,
// });

// gsap.from(".headshot", {
//     opacity: 0,
//     duration: 1,
// });

// gsap.from("header", {
//     opacity: 0,
//     duration: 0.5,
//     delay: 0.75,
// });

window.onresize = () => {
    const path = document.getElementById("water");
    const info = {
        clientWidth: path.clientWidth,
        clientHeight: path.clientHeight,
        ratio: path.clientHeight / path.clientWidth,
        innerWidth: window.innerWidth,
        calcHeight: 0.071354167 * window.innerWidth,
    };
    startAnim();
};
