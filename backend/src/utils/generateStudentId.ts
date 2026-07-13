import crypto from "crypto";

/**
 * Generates a unique student ID with only numbers.
 * Format: 10 digits (YYMMDD + 4 random digits)
 * Example: 2606294837
 * @returns {string} The generated unique student ID.
 */
export function generateStudentId(): string {
  const now: Date = new Date();

  // 6 chars: YYMMDD
  const dateString: string =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  // Generate 4 random digits
  const randomLength: number = 6;
  let randomString: string = "";

  const randomBytes: Buffer = crypto.randomBytes(randomLength);
  for (let i = 0; i < randomLength; i++) {
    randomString += String(randomBytes[i] % 10);
  }

  return `${dateString}${randomString}`;
}
