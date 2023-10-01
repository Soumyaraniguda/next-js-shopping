import dayjs from "dayjs";
export function calculateDiff(timeInMs) {
  const timeStampDayJs = dayjs(timeInMs);
  const nowDayJs = dayjs();

  if (timeStampDayJs.isBefore(nowDayJs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayJs, timeStampDayJs),
    minutes: getRemainingMinutes(nowDayJs, timeStampDayJs),
    hours: getRemainingHours(nowDayJs, timeStampDayJs),
    days: getRemainingDays(nowDayJs, timeStampDayJs),
  };
}

function getRemainingSeconds(nowDayJs, timeStampDayJs) {
  // Here if we get 90 seconds we only show 30
  // The rest of 60 seconds will be shown in minutes
  // That is why we do module 60
  const seconds = timeStampDayJs.diff(nowDayJs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayJs, timeStampDayJs) {
  // Here if we get 90 minutes we only show 30
  // The rest of 60 seconds will be shown in hours
  // That is why we do module 60
  const minutes = timeStampDayJs.diff(nowDayJs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayJs, timeStampDayJs) {
  const hours = timeStampDayJs.diff(nowDayJs, "hours") % 24;
  return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayJs, timeStampDayJs) {
  const days = timeStampDayJs.diff(nowDayJs, "days");
  return days.toString();
}

function padWithZeros(number, length) {
  const numberInString = number.toString();
  if (numberInString.length >= 2) return numberInString;
  return "0".repeat(length - numberInString.length) + numberInString;
}
