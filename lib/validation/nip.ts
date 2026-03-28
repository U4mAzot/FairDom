/** Walidacja numeru NIP (10 cyfr, suma kontrolna wg schematu dla polskich NIP). */
export function digitsOnlyNip(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidPolishNip(value: string): boolean {
  const digits = digitsOnlyNip(value);
  if (digits.length !== 10) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(digits[i]) * weights[i]!;
  }
  const checksum = sum % 11;
  if (checksum === 10) return false;
  return checksum === Number(digits[9]);
}

export function formatNipDisplay(digits: string): string {
  const d = digitsOnlyNip(digits);
  if (d.length !== 10) return digits.trim();
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`;
}
