import readline from "linebyline";

const rl = readline("./roller_coaster.hard");

let L = 0; // max number of places by ride
let C = 0; // number of rides
let N = 0; // number of groups in cue

let sum = 0;

let rounds = 0;
let groups = [];
const groupCue = [];
let groupRide = [];

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

function fillRide(peopleAccepted: number): number {
  for (const pi of groupCue) {
    if (peopleAccepted + pi > L) {
      break;
    }
    peopleAccepted += pi;
    console.log("--> peopleAccepted", peopleAccepted);
    groupCue.shift();
    groupRide.push(pi);
  }
  return peopleAccepted;
}

function emptyRide() {
  groupCue.push(groupRide);
  groupCue.flat();
  groupRide = [];
}

function start(): number {
  for (let i = 0; i < C; i++) {
    let peopleAccepted = 0;

    peopleAccepted = fillRide(peopleAccepted);
    sum += peopleAccepted;

    emptyRide();
  }

  return sum;
}

async function runTest() {
  await getInputData();
  const sum = start();
  console.log(sum);
}
runTest();
