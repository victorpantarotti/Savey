import { VideosObject } from "@/contexts/VideosContext";

interface IsYoutubeURLInterface {
  valid: boolean,
  id: string,
  lastTime: string
}

const arrayToObject = (array: VideosObject[]): Record<string | number, VideosObject> => array.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {} as Record<string | number, VideosObject>);

const objectToArray = (obj: Record<string | number, VideosObject>): VideosObject[] => Object.keys(obj).map((key) => obj[key]);

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

function isYoutubeURL(url: string): IsYoutubeURLInterface {
  const regExp = /^(?:.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#&\?]*)(?:.*[?&]t=([^&#]*))?.*)$/;
  const match = url.match(regExp);

  return {
    valid: match && match[1].length == 11 || false,
    id: match && match[1] || "",
    lastTime: match && match[2] || ""
  };
}

function convertYTDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  if (!match) return '00:00';

  const [hoursPart, minutesPart, secondsPart] = match.slice(1).map((x) => {
    return x ? x.replace(/\D/, '') : '0'; // Default to '0' if null
  });

  const hours = parseInt(hoursPart) || 0;
  const minutes = parseInt(minutesPart) || 0;
  const seconds = parseInt(secondsPart) || 0;

  const date = new Date(0);
  date.setSeconds(hours * 3600 + minutes * 60 + seconds);
  const format = date.toISOString().substring(11, 19);
  const formatSplit = format.split(':');
  
  let time = '';

  if (formatSplit[0] !== '00') time += `${formatSplit[0]}:`; // hr
  time += `${formatSplit[1]}:${formatSplit[2]}`; // min + sec

  return time;
}

export default {
  arrayToObject,
  objectToArray,
  checkTimeFormat,
  sumTime,
  compareTimes,
  isYoutubeURL,
  convertYTDuration
};