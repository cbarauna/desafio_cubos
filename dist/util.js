"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkExists(intervalsA, intervalsB) {
    let controle;
    for (let i = 0; i < intervalsA.length; i++) {
        controle = findHour(intervalsA[i], intervalsB);
        if (!controle) {
            return false;
        }
    }
    return controle;
}
exports.checkExists = checkExists;
function findHour(intervalsA, intervalsB) {
    for (let y = 0; y < intervalsB.length; y++) {
        if (intervalsA.start == intervalsB[y].start && intervalsA.end == intervalsB[y].end) {
            //ja existe essa hora
            return true;
        }
    }
    return false;
}
function daysWeek(weekA, weekB) {
    let controle;
    if (weekB.length == 0) {
        return false;
    }
    for (let k = 0; k < weekB.length; k++) {
        if (weekB[k].day == weekA[k].day) {
            controle = true;
        }
        else {
            controle = false;
            return controle;
        }
    }
    return controle;
}
exports.daysWeek = daysWeek;
function findWeek(row, value) {
    for (let y = 0; y < row.days_of_the_week.length; y++) {
        if (value == row.days_of_the_week[y].day) {
            return true;
        }
    }
    return false;
}
exports.findWeek = findWeek;
//# sourceMappingURL=util.js.map