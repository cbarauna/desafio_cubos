export function checkExists(intervalsA: Array<any>, intervalsB: Array<any>): boolean {
  let controle;
  for (let i = 0; i < intervalsA.length; i++) {
    controle = findHour(intervalsA[i], intervalsB);

    if (!controle) {
      return false;
    }
  }

  return controle;
}

function findHour(intervalsA: any, intervalsB: Array<any>) {
  for (let y = 0; y < intervalsB.length; y++) {
    if (intervalsA.start == intervalsB[y].start && intervalsA.end == intervalsB[y].end) {
      return true;
    }
  }
  return false;
}

export function daysWeek(weekA: Array<any>, weekB: Array<any>): boolean {

  let controle;

  if (weekB.length == 0) {
    return false;
  }

  for (let k = 0; k < weekB.length; k++) {

    if (weekB[k].day == weekA[k].day) {
      controle = true;
    } else {
      controle = false;
      return controle;
    }
  }

  return controle;
}

export function findWeek(row: any, value: string) {
  for (let y = 0; y < row.days_of_the_week.length; y++) {
    if (value == row.days_of_the_week[y].day) {
      return true;
    }
  }
  return false;
}