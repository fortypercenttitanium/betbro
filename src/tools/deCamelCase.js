export default function deCamelCase(str) {
  const newStr = str.replaceAll(/[A-Z]/g, (letter) => ` ${letter}`);
  const firstLetter = newStr[0].toUpperCase();

  return firstLetter + newStr.slice(1);
}
