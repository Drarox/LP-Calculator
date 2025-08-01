/**
 * Utility functions for datetime operations
 */

/**
 * Get local datetime string in the format required by datetime-local input
 * @returns {string} Local datetime string in YYYY-MM-DDTHH:MM format
 */
export const getLocalDateTimeString = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Format datetime string for display
 * @param {string} datetime - ISO datetime string
 * @returns {string} Formatted datetime string
 */
export const formatDateTime = (datetime: string): string => {
  return new Date(datetime).toLocaleString();
};

/**
 * Format date string for display
 * @param {string} date - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

/**
 * Calculate precise days between two dates (including fractional days)
 * @param {string} startDate - Start date in ISO format
 * @param {string} endDate - End date in ISO format
 * @returns {number} Precise number of days between dates (e.g., 1.04 for 25 hours)
 */
export const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.max(0.01, diffDays); // Minimum 0.01 days to avoid division by zero
};