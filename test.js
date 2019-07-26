import { DH_CHECK_P_NOT_PRIME } from "constants";

function getAllNumbersBetween(x, y) {
  let numbers = [];

  for (const i = x; i < y; i++) {

    if (x < y && i % 2 === 0) {
      numbers.push(i);
    } else
    // else if (x>y && i%2 !== 0) 
    {
      numbers.push(i);
    }

  }
  return numbers;
}
getAllNumbersBetween(10, 2);