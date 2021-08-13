// paths for the water svg to cycle between
const WATER_PATHS = [
    "M1920 136.339H0V62C98.5 80.7826 240.789 110 412 110C566.526 110 741.993 118.565 898.5 84.3042C1076.65 45.3042 1181.79 17.0803 1511.5 2.08664C1786.37 -10.4132 1876.73 35.3036 1920 84.3042V136.339Z",
    "M1920 136.086H0V107.052C104.348 114.051 354.584 99.0533 491 65.0521C646.71 26.242 809.161 1.55241 969.5 0.0524134C1129.84 -1.44759 1261.26 29.4641 1456 65.0521C1641.5 98.9507 1816.16 113.719 1920 107.052V136.086Z",
    "M1920 135.759H0V55.8101C94.1675 20.3101 307.307 -10.7852 455 3.59178C624.502 20.0917 743.286 41.3531 904.5 64.3105C1071.5 88.0918 1264.56 96.8105 1459.5 96.8105C1615.81 96.8105 1811 91.3104 1920 74.3105V135.759Z",
    "M1920 136H0V0.000267577C111 42.1645 181.975 51.3289 329.5 67.2779C518.5 87.7108 592.292 80.5766 786.5 91.1993C950.5 100.17 1373.5 100.668 1555.5 80.2355C1708.53 63.0547 1813 41.862 1920 0V136Z",
];
// index keeping track of which path to change to *next*
// svg begins with path 0 so set this variable to 1
let waterIdx = 1;

// query for the water svg's path element
const waterPath = Snap.select("#water path");

// function to cycle the water svg to the next path in the list
const nextWaterPath = () => {
    waterPath.animate(
        { d: WATER_PATHS[waterIdx] },
        3000,
        mina.linear,
        nextWaterPath
    );
    waterIdx = (waterIdx + 1) % WATER_PATHS.length;
};

// begin the water animation
nextWaterPath();

// values here represent the Y offset to give the boat,
// as a percentage of the viewport width
const BOAT_HEIGHTS = [0, 0.04, 0.035, 0.04];
// BOAT_DURS[i] is the time it takes to go *to* BOAT_HEIGHTS[i]
const BOAT_DURS = [5500, 3500, 1500, 1500];
// BOAT_EASINGS[i] is the easing used to go *to* BOAT_HEIGHTS[i]
const BOAT_EASINGS = [mina.easeout, mina.easein, mina.easeout, mina.easein];
// index keeping track of which boat value to change to *next*
// boat begins 0 so set this variable to 1
let boatIdx = 1;

// query for the boat svg
const boat = Snap.select(".boat");

// function to control the boat's movement
const nextBoatHeight = () => {
    const height = window.innerWidth * BOAT_HEIGHTS[boatIdx];
    const dur = BOAT_DURS[boatIdx];
    const easing = BOAT_EASINGS[boatIdx];
    boatIdx = (boatIdx + 1) % BOAT_HEIGHTS.length;
    const transform = `t0,${height}`;
    boat.animate({ transform: transform }, dur, easing, nextBoatHeight);
};

// begin the boat animation
nextBoatHeight();

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
