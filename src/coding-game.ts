/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

var inputs: string[] = readline().split(" ");
const L: number = parseInt(inputs[0]);
const C: number = parseInt(inputs[1]);
const N: number = parseInt(inputs[2]);

let sum = 0;

let rounds = 0;
let groups = [];
const groupCue = new Map();
const groupRide = new Map();

// tout sauvegarder dans une MAP
for (let i = 0; i < N; i++) {
  const pi: number = parseInt(readline());
  groupCue.set(i, pi);
}

function emptyRide() {
  for (const [index, pi] of groupRide) {
    groupRide.delete(index);
    groupCue.set(index, pi);
  }
}

function fillRide(peopleAccepted: number): number {
  for (const [index, pi] of groupCue) {
    const groupPi = Number(pi);
    if (peopleAccepted + groupPi > L) {
      break;
    }
    peopleAccepted += groupPi;

    groupCue.delete(index);
    groupRide.set(index, pi);
  }
  return peopleAccepted;
}

for (let i = 0; i < C; i++) {
  let peopleAccepted = 0;

  peopleAccepted = fillRide(peopleAccepted);

  sum += peopleAccepted;

  emptyRide();
}

console.log(sum);
