import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceToNow,
  fromUnixTime,
  isToday,
  isTomorrow,
  isValid,
  isYesterday,
  parseISO,
} from 'date-fns';

/**
 * Comprehensive date formatting function with multiple parsing and formatting options
 *
 * @param {string|number|Date} input - The date input (timestamp string, unix timestamp, or Date object)
 * @param {Object} options - Formatting options
 * @param {string} options.format - Output format (default: 'MMM dd, yyyy')
 * @param {boolean} options.relative - Use relative formatting like "2 hours ago" (default: false)
 * @param {boolean} options.smart - Use smart formatting (Today, Yesterday, etc.) (default: false)
 * @param {string} options.fallback - Fallback text for invalid dates (default: 'Invalid Date')
 * @param {string} options.timezone - Timezone (currently not implemented, for future use)
 * @param {boolean} options.includeTime - Include time in smart format (default: true)
 *
 * @returns {string} Formatted date string
 */
export const formatDate = (input: any, options: any = {}) => {
  const {
    format: outputFormat = 'MMM dd, yyyy',
    relative = false,
    smart = false,
    fallback = 'Invalid Date',
    includeTime = true
  } = options;

  try {
    const date = parseInput(input);

    if (!isValid(date)) {
      return fallback;
    }

    // Relative formatting (e.g., "2 hours ago", "in 3 days")
    if (relative) {
      return formatDistanceToNow(date, { addSuffix: true });
    }

    // Smart formatting with context-aware display
    if (smart) {
      return formatSmart(date, includeTime);
    }

    // Standard formatting
    return format(date, outputFormat);

  } catch (error) {
    console.warn('Date formatting error:', error);
    return fallback;
  }
};

/**
 * Parse various input formats into a Date object
 * @param {string|number|Date} input - The input to parse
 * @returns {Date} Parsed date object
 */
const parseInput = (input: any) => {
  // Already a Date object
  if (input instanceof Date) {
    return input;
  }

  // Handle null/undefined
  if (input === null || input === undefined) {
    return new Date('invalid');
  }

  // Unix timestamp (number or string of numbers)
  if (typeof input === 'number' || /^\d+$/.test(String(input))) {
    const timestamp = Number(input);

    // Detect if timestamp is in seconds or milliseconds
    // Timestamps before year 2001 in milliseconds would be < 1e12
    // Timestamps after year 2286 in seconds would be > 1e10
    if (timestamp < 1e10) {
      // Likely seconds
      return fromUnixTime(timestamp);
    } else {
      // Likely milliseconds
      return new Date(timestamp);
    }
  }

  // ISO string or other date string formats
  if (typeof input === 'string') {
    // Try ISO format first (most common for APIs)
    if (input.includes('T') || input.includes('Z') || input.match(/^\d{4}-\d{2}-\d{2}/)) {
      return parseISO(input);
    }

    // Try native Date parsing for other formats
    return new Date(input);
  }

  return new Date('invalid');
};

/**
 * Smart formatting with context-aware display
 * @param {Date} date - The date to format
 * @param {boolean} includeTime - Whether to include time
 * @returns {string} Formatted string
 */
const formatSmart = (date: Date, includeTime: boolean) => {
  const now = new Date();
  const timeFormat = includeTime ? ' \'at\' h:mm a' : '';

  if (isToday(date)) {
    if (includeTime) {
      const hoursDiff = differenceInHours(now, date);
      const minutesDiff = differenceInMinutes(now, date);

      if (Math.abs(hoursDiff) < 1) {
        if (Math.abs(minutesDiff) < 1) {
          return 'Just now';
        }
        return `${Math.abs(minutesDiff)} minute${Math.abs(minutesDiff) !== 1 ? 's' : ''} ${minutesDiff < 0 ? 'from now' : 'ago'}`;
      }

      if (Math.abs(hoursDiff) < 6) {
        return `${Math.abs(hoursDiff)} hour${Math.abs(hoursDiff) !== 1 ? 's' : ''} ${hoursDiff < 0 ? 'from now' : 'ago'}`;
      }
    }

    return `Today${format(date, timeFormat)}`;
  }

  if (isYesterday(date)) {
    return `Yesterday${format(date, timeFormat)}`;
  }

  if (isTomorrow(date)) {
    return `Tomorrow${format(date, timeFormat)}`;
  }

  const daysDiff = differenceInDays(now, date);

  // Within a week
  if (Math.abs(daysDiff) <= 7) {
    const dayFormat = includeTime ? `EEEE${timeFormat}` : 'EEEE';
    return format(date, dayFormat);
  }

  // Within current year
  if (date.getFullYear() === now.getFullYear()) {
    const yearFormat = includeTime ? `MMM dd${timeFormat}` : 'MMM dd';
    return format(date, yearFormat);
  }

  // Different year
  const fullFormat = includeTime ? `MMM dd, yyyy${timeFormat}` : 'MMM dd, yyyy';
  return format(date, fullFormat);
};

/**
 * Predefined formatting presets
 */
export const datePresets = {
  short: (input: any) => formatDate(input, { format: 'M/d/yy' }),
  medium: (input: any) => formatDate(input, { format: 'MMM dd, yyyy' }),
  long: (input: any) => formatDate(input, { format: 'MMMM dd, yyyy' }),
  full: (input: any) => formatDate(input, { format: 'EEEE, MMMM dd, yyyy' }),
  time: (input: any) => formatDate(input, { format: 'h:mm a' }),
  datetime: (input: any) => formatDate(input, { format: 'MMM dd, yyyy \'at\' h:mm a' }),
  iso: (input: any) => formatDate(input, { format: "yyyy-MM-dd'T'HH:mm:ss'Z'" }),
  relative: (input: any) => formatDate(input, { relative: true }),
  smart: (input: any) => formatDate(input, { smart: true }),
  smartNoTime: (input: any) => formatDate(input, { smart: true, includeTime: false })
};

/**
 * Batch format multiple dates
 * @param {Array} dates - Array of date inputs
 * @param {Object} options - Formatting options
 * @returns {Array} Array of formatted date strings
 */
export const formatDates = (dates: Array<Date>, options = {}) => {
  return dates.map(date => formatDate(date, options));
};

/**
 * Check if a date string/timestamp is valid
 * @param {string|number|Date} input - The input to validate
 * @returns {boolean} True if valid date
 */
export const isValidDate = (input: any) => {
  try {
    const date = parseInput(input);
    return isValid(date);
  } catch {
    return false;
  }
};

// Usage examples:
/*
import { formatDate, datePresets, isValidDate } from './dateFormatter';

// Basic usage
formatDate('2024-01-15T10:30:00Z'); // "Jan 15, 2024"
formatDate(1705318200); // Unix timestamp
formatDate(1705318200000); // Unix timestamp in milliseconds

// With options
formatDate('2024-01-15T10:30:00Z', {
  format: 'EEEE, MMMM do, yyyy \'at\' h:mm a'
}); // "Monday, January 15th, 2024 at 10:30 AM"

// Relative formatting
formatDate('2024-01-15T10:30:00Z', { relative: true }); // "2 hours ago"

// Smart formatting
formatDate(new Date(), { smart: true }); // "Today at 2:30 PM"
formatDate(subDays(new Date(), 1), { smart: true }); // "Yesterday at 10:15 AM"

// Using presets
datePresets.short('2024-01-15'); // "1/15/24"
datePresets.long('2024-01-15'); // "January 15, 2024"
datePresets.relative('2024-01-15T10:30:00Z'); // "2 hours ago"
datePresets.smart(new Date()); // "Today at 2:30 PM"

// Validation
isValidDate('2024-01-15'); // true
isValidDate('invalid-date'); // false

// Batch formatting
const timestamps = ['2024-01-15T10:30:00Z', '2024-01-16T14:45:00Z'];
formatDates(timestamps, { format: 'MMM dd' }); // ["Jan 15", "Jan 16"]
*/
