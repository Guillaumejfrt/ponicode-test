import readline from "linebyline";

const rl = readline("./roller_coaster.hard");

let L = 0; // max number of places by ride
let C = 0; // number of rides
let N = 0; // number of groups in cue

let groupCue = [];
let groupRide = [];
let sum = 0;

function addGroupToCue(lineCount: number, group: string) {
  const pi: number = parseInt(group);
  groupCue.push(pi);
}

function getInputData() {
  return new Promise(function (resolve, reject) {
    rl.on("line", async function (line, lineCount, byteCount) {
      if (lineCount === 1) {
        const inputs: string[] = line.split(" ");
        L = parseInt(inputs[0]);
        C = parseInt(inputs[1]);
        N = parseInt(inputs[2]);
      } else {
        addGroupToCue(lineCount, line);
      }
    })
      .on("close", function () {
        resolve({ L, C, N, groupCue });
      })
      .on("error", function (e) {
        console.log("---> ERROR", e);
      });
  });
}

function fillRideAndGetSum() {
  const starter = {
    rideLength: 0,
    sum: 0,
  };

  const result = groupCue.reduce((acc, pi) => {
    if (acc.sum + pi > L) {
      return acc;
    }
    acc.sum += pi;
    acc.rideLength += 1;
    return acc;
  }, starter);

  groupRide = groupCue.splice(0, result.rideLength);

  sum += result.sum;
}

function fillCueWithRide() {
  groupCue.push(groupRide);
  groupCue = groupCue.flat();
}

function makeARide() {
  fillRideAndGetSum();
  fillCueWithRide();
}

async function start() {
  // It's still way too long.
  // I would have liked to do a while loop in a promise.
  // I think it's much faster but I don't have more time to do it.
  for (let i = 0; i < C; i++) {
    makeARide();
  }
}

async function runTest() {
  await getInputData();
  await start();
  console.log("-------> final Sum", sum);
}
runTest();
