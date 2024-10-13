interface Item {
    id: string | number;
}

const arrayToObject = (array: Item[]): Record<string | number, Item> => array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
}, {} as Record<string | number, Item>);

const objectToArray = (obj: Record<string | number, Item>): Item[] => Object.keys(obj).map((key) => obj[key]);

function checkTimeFormat(time: string): boolean {
  const regex = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
  return regex.test(time);
}

function parseTimeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  let seconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS
    seconds += parts[0] * 3600;  // hours to seconds
    seconds += parts[1] * 60;    // minutes to seconds
    seconds += parts[2];         // seconds
  } else if (parts.length === 2) {
    // MM:SS
    seconds += parts[0] * 60;    // minutes to seconds
    seconds += parts[1];         // seconds
  } else if (parts.length === 1) {
    // SS
    seconds += parts[0];         // seconds
  }

  return seconds;
}

function formatSecondsToTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function sumTime(times: string[]): string {
  const totalSeconds = times.reduce((acc, time) => acc + parseTimeToSeconds(time), 0);
  return formatSecondsToTime(totalSeconds);
}

function parseTimeString(time: string): number {
  // Updated regex to capture hours (h), minutes (m), and seconds (s)
  const regex = /(\d+)(h|m|s)/g;
  let totalSeconds = 0;
  let match;

  // Initialize values for hours, minutes, and seconds
  let hours = 0, minutes = 0, seconds = 0;

  // Loop through the matches
  while ((match = regex.exec(time)) !== null) {
    const value = parseInt(match[1]);
    const unit = match[2];

    // Depending on the unit, update hours, minutes, or seconds
    if (unit === 'h') {
      hours = value;
    } else if (unit === 'm') {
      minutes = value;
    } else if (unit === 's') {
      seconds = value;
    }
  }

  // Calculate total time in seconds
  totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds;
}

function compareTimes(time: string, filterTime: string): boolean {
  return parseTimeToSeconds(time) <= parseTimeString(filterTime);
}

export default {
  arrayToObject,
  objectToArray,
  checkTimeFormat,
  sumTime,
  compareTimes
};