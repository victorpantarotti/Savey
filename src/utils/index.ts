interface Item {
    id: string | number;
}

const arrayToObject = (array: Item[]): Record<string | number, Item> => array.reduce((obj, item) => {
    obj[item.id] = item;
    return obj;
}, {} as Record<string | number, Item>);

const objectToArray = (obj: Record<string | number, Item>): Item[] => Object.keys(obj).map((key) => obj[key]);

function parseTimeToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  let seconds = 0;

  if (parts.length === 3) {
    // HH:MM:SS
    seconds += parts[0] * 3600; // hours to seconds
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

export default {
  arrayToObject,
  objectToArray,
  sumTime
};