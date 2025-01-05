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

function formatSecondsToTime(totalSeconds: number, showHour?: boolean): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${showHour ? `${hours}:` : ""}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function sumTime(times: string[]): string {
  const totalSeconds = times.reduce((acc, time) => acc + parseTimeToSeconds(time), 0);
  return formatSecondsToTime(totalSeconds, true);
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
  // Check if duration is in seconds-only format (e.g., "729s" or "729")
  if (/^\d+s?$/.test(duration)) {
    const totalSeconds = parseInt(duration.replace(/\D/g, ''), 10);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format with leading zeros as necessary
    const hoursPart = hours > 0 ? `${hours}:` : ''; // Only include hours if greater than 0
    const minutesPart = `${minutes.toString().padStart(2, '0')}`;
    const secondsPart = `${seconds.toString().padStart(2, '0')}`;

    return `${hoursPart}${minutesPart}:${secondsPart}`;
  }

  // Otherwise, assume the duration is in the "PT#H#M#S" format
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';

  const [hoursPart, minutesPart, secondsPart] = match.slice(1).map((x) => (x ? x.replace(/\D/, '') : '0'));
  const hours = parseInt(hoursPart) || 0;
  const minutes = parseInt(minutesPart) || 0;
  const seconds = parseInt(secondsPart) || 0;

  // Format with leading zeros and build the final time string
  const timeParts = [];
  if (hours > 0) timeParts.push(hours.toString()); // Include hours only if greater than 0
  timeParts.push(minutes.toString().padStart(2, '0'));
  timeParts.push(seconds.toString().padStart(2, '0'));

  return timeParts.join(':');
}

function convertDurationToTime(duration: string): string {
  // Regex para identificar "Xh Ym Zs", "Xh Ym", "Ym Zs", "Xs", "Xm" ou apenas números
  const regex = /(\d+)([hms])/g;
  let totalSeconds = 0;
  let match;

  // Converte todas as unidades para segundos
  while ((match = regex.exec(duration)) !== null) {
    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit === "h") totalSeconds += value * 3600; // Horas para segundos
    else if (unit === "m") totalSeconds += value * 60; // Minutos para segundos
    else if (unit === "s") totalSeconds += value; // Segundos
  }

  // Caso seja apenas um número simples, trata como segundos
  if (/^\d+$/.test(duration)) {
    totalSeconds += parseInt(duration, 10);
  }

  // Converte segundos totais para formato legível
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Monta a string final omitindo unidades desnecessárias
  let formattedDuration = '';
  if (hours > 0) formattedDuration += `${hours}h`;
  if (minutes > 0) formattedDuration += `${minutes}m`;
  if (seconds > 0 || formattedDuration === '') formattedDuration += `${seconds}s`;

  return formattedDuration.trim(); // Remove espaços extras
}

export default {
  arrayToObject,
  objectToArray,
  checkTimeFormat,
  parseTimeToSeconds,
  sumTime,
  compareTimes,
  isYoutubeURL,
  convertYTDuration,
  convertDurationToTime
};