export function checkUsername(username: string): boolean {
  return new RegExp('[A-Za-z0-9-_]{4,}').test(username);
}

export function checkPassword(password: string): boolean {
  return (
    new RegExp('[^A-Za-z0-9]+').test(password) &&
    new RegExp('[0-9]+').test(password) &&
    new RegExp('[a-z]+').test(password) &&
    new RegExp('[A-Z]+').test(password) &&
    password.length >= 8 &&
    password.length <= 16
  );
}

export function checkPasswordMatch(
  password: string,
  confirmPassword: string
): boolean {
  return password == confirmPassword;
}

export function checkPhone(phone: string): boolean {
  return new RegExp('^[0-9+-/ ]{9,17}$').test(phone);
}

export function checkEmail(email: string): boolean {
  return new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  ).test(email);
}

export function checkOther(other: string): boolean {
  return other.length > 0;
}

export function checkImage(height: number, width: number): boolean {
  return height >= 100 && height <= 300 && width >= 100 && width <= 300;
}
