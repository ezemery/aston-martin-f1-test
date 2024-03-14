export const RACEYEARS:raceType[] = [];

type raceType = {
    [key: string]:number
  }

for (let i = 2023; i >= 1950; i--) {
  let obj:raceType = {};
  obj["label"] = i;
  obj["value"] = i;

  RACEYEARS.push(obj);
}