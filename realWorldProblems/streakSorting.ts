/**
 * ## Problem: Medication Adherence Streak
Scenario

You are a backend engineer at a healthtech company that helps patients manage their chronic conditions. One of the key features of your app is tracking medication adherence. Your task is to build a function that analyzes a patient's medication log to find their longest "adherence streak."

An adherence streak is the longest number of consecutive days that a patient has taken the correct dosage of a specific medication.

Rules

Correct Dosage: A day is considered "adherent" if the total quantity of medication taken on that calendar day equals the required dailyDose.

Calendar Day: A "day" is defined as a 24-hour period from midnight to midnight (e.g., 2023-10-25T00:00:00.000Z to 2023-10-25T23:59:59.999Z). All timestamps are in UTC.

Consecutive Days: A streak is a sequence of one or more adherent days with no gaps. For example, if a patient is adherent on Monday and Wednesday but not Tuesday, their longest streak is 1 day.

Data Integrity: The intakeLog timestamps may be out of order and can contain multiple entries for the same day.


 */

const input = {
  medication: "Metformin",
  dailyDose: 2,
  intakeLog: [
    { timestamp: "2023-10-25T08:05:00.000Z", quantity: 1 },
    { timestamp: "2023-10-26T20:00:00.000Z", quantity: 2 },
    { timestamp: "2023-10-29T08:55:00.000Z", quantity: 1 },
    { timestamp: "2023-10-25T19:30:00.000Z", quantity: 1 },
    { timestamp: "2023-10-28T09:00:00.000Z", quantity: 2 },
    { timestamp: "2023-10-27T19:15:00.000Z", quantity: 2 },
    { timestamp: "2023-11-01T21:10:00.000Z", quantity: 2 },
    { timestamp: "2023-02-01T21:10:00.000Z", quantity: 2 },
  ],
};

type IntakeLog = {
  timestamp: string;
  quantity: number;
};

type StreakSortInput = {
  medication: string;
  dailyDose: number;
  intakeLog: IntakeLog[];
};

type StreakSortResult = {
  streakLength: number;
  streakStartDate: string | null;
};

function sortStreaks(input: StreakSortInput): StreakSortResult | void {
  // We need to parse and sort all of the incoming data. and put them all into buckets, one for each date.
  const groupedIntakeResult: Record<string, number> = {};
  input.intakeLog.forEach((intakeLog) => {
    const date = intakeLog.timestamp.split("T")[0];
    if (groupedIntakeResult[date]) {
      groupedIntakeResult[date] += intakeLog.quantity;
    } else {
      groupedIntakeResult[date] = intakeLog.quantity;
    }
  });

  const allStreaks: StreakSortResult[] = [];
  const currentStreak: StreakSortResult = {
    streakLength: 0,
    streakStartDate: null,
  };
  const sortedIntakeDates = Object.keys(groupedIntakeResult).sort(); // need to check edge cases of this later to verify no unexpected sorting happens
  let lastDate: Date | 0 = 0;
  sortedIntakeDates.forEach((date) => {
    // write out each use case
    // if the current dose does not match

    // if current dose is not the right value, exit early, save the current streak, else continue and check the date

    if (groupedIntakeResult[date] !== input.dailyDose) {
      allStreaks.push({ ...currentStreak });
      return;
    }

    if (!currentStreak.streakStartDate) {
      currentStreak.streakStartDate = date;
      currentStreak.streakLength = 1;
      return;
    }

    const currentDate = new Date(date);
    const timeDiff = (currentDate.getTime() - lastDate) / (1000 * 60 * 60 * 24); // we can use momentJS to handle this date calculation much easier

    if (timeDiff === 1) {
      currentStreak.streakLength++;
    } else {
      allStreaks.push({ ...currentStreak });
    }
    // check if current day is last day +1

    // if true, then proceed

    // if false, save the current streak, and proceed
  });
  // We also need to sort all of dates to be in chronological order
  // then we need to iterate through all of the sorted data, verifying that the current bucket has:
  // 1. a sequential date after the previous
  // 2. a valid dose
  console.log(allStreaks);

  const maxStreak = allStreaks.reduce(
    (prev, curr) => {
      if (curr.streakLength > prev.streakLength) {
        return curr;
      } else {
        return prev;
      }
    },
    {
      streakLength: 0,
      streakStartDate: null,
    }
  );

  return maxStreak;
}

console.log(sortStreaks(input));
