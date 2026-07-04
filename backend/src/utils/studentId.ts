import crypto from "crypto";

/**
 * Generates a unique student ID consisting of a 2-digit year date string
 * and a secure random string of characters and symbols.
 * * Format: YYMMDDHHMMSS-XXXXXXXX
 * Example: 260629235821-aB3$k9_X
 * * @returns {string} The generated unique student ID.
 */
export function generateStudentId(): string {
  const now: Date = new Date();

  // Format: YYMMDDHHMMSS
  const dateString: string =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  // Custom character pool including letters, numbers, and symbols
  const chars: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@_$!";
  const randomLength: number = 8;
  let randomString: string = "";

  // Generate cryptographically secure random bytes
  const randomBytes: Buffer = crypto.randomBytes(randomLength);
  for (let i = 0; i < randomLength; i++) {
    randomString += chars[randomBytes[i] % chars.length];
  }

  return `${dateString}-${randomString}`;
}
