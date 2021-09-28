// path values the water svg cycles between
const WATER_PATHS = [
    "M1920 136.086H0V107.052C104.348 114.051 354.584 99.0533 491 65.0521C646.71 26.242 809.161 1.55241 969.5 0.0524134C1129.84 -1.44759 1261.26 29.4641 1456 65.0521C1641.5 98.9507 1816.16 113.719 1920 107.052V136.086Z",
    "M1920 135.759H0V55.8101C94.1675 20.3101 307.307 -10.7852 455 3.59178C624.502 20.0917 743.286 41.3531 904.5 64.3105C1071.5 88.0918 1264.56 96.8105 1459.5 96.8105C1615.81 96.8105 1811 91.3104 1920 74.3105V135.759Z",
    "M1920 136H0V0.000267577C111 42.1645 181.975 51.3289 329.5 67.2779C518.5 87.7108 592.292 80.5766 786.5 91.1993C950.5 100.17 1373.5 100.668 1555.5 80.2355C1708.53 63.0547 1813 41.862 1920 0V136Z",
    "M1920 136.339H0V62C98.5 80.7826 240.789 110 412 110C566.526 110 741.993 118.565 898.5 84.3042C1076.65 45.3042 1181.79 17.0803 1511.5 2.08664C1786.37 -10.4132 1876.73 35.3036 1920 84.3042V136.339Z",
];

// query for the svgs to animate
const waterSnap = Snap.select("#water path");
const waterPath = document.querySelector("#water path");
const icons = [...document.querySelectorAll(".skill-icons img")];
icons.push(document.querySelector(".boat"));

// variable to keep track of water's animation state
let waterIdx = 0;
// variable to store all queued timeouts
const timeouts = [];

// cycle through the water animations
const waterAnimIter = () => {
    const path = WATER_PATHS[waterIdx];
    waterSnap.animate({ d: path }, 3000, mina.linear);
    waterIdx = (waterIdx + 1) % WATER_PATHS.length;
    timeouts.push(setTimeout(waterAnimIter, 3000));
};

// start all animations
const startAnim = () => {
    // start the water animation
    waterAnimIter();

    // set icon's animation style to null so it's inherited from CSS
    icons.forEach((icon) => {
        icon.style.animation = null;
    });
};

// stop all animations
const stopAnim = () => {
    // clear any pending timeouts
    while (timeouts.length) {
        clearTimeout(timeouts.pop());
    }
    // stop water animation and set to inital state
    waterSnap.stop();
    waterIdx = 0;
    waterPath.setAttribute(
        "d",
        "M1920 136.339H0V62C98.5 80.7826 240.789 110 412 110C566.526 110 741.993 118.565 898.5 84.3042C1076.65 45.3042 1181.79 17.0803 1511.5 2.08664C1786.37 -10.4132 1876.73 35.3036 1920 84.3042V136.339Z"
    );

    // stop icon animation
    icons.forEach((icon) => {
        icon.style.animation = "none";
        void icon.offsetWidth; // trigger reflow
    });
};

// start up the animations
startAnim();

// store the timeout used when restarting animations
let restartTimeout;
// stop animations then start after a delay
const restartAnim = () => {
    stopAnim();
    restartTimeout = setTimeout(startAnim, 50);
};

// on resize, cancel any previously queued restarts then restart animations
window.onresize = () => {
    clearTimeout(restartTimeout);
    restartAnim();
};

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
