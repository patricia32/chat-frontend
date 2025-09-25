import {
  format,
  isToday,
  isYesterday,
  isThisWeek,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from 'date-fns';

export function formatChatTimestamp(timestamp) {
  const date = typeof timestamp === 'string' ? parseISO(timestamp) : new Date(timestamp);
  const now = new Date();

  const diffInMinutes = differenceInMinutes(now, date);
  const diffInHours = differenceInHours(now, date);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24 && isToday(date)) return `${diffInHours}h ago`;
  if (isYesterday(date)) return 'Yesterday';
  if (isThisWeek(date, { weekStartsOn: 1 })) return format(date, 'EEEE'); // e.g., Monday
  return format(date, 'MMM d'); // e.g., Sep 10
}
