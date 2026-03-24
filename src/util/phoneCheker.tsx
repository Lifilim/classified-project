export function isPhone(name: string): string | null {
  if (typeof name !== 'string' || !name.trim()) {
    return null;
  }

  const matches = name.match(/([0-9])+/g);

  if (!matches) {
    return null;
  }

  const str = matches.join('');

  let res: string;

  if (name.charAt(0) === '+') {
    res = '+' + str;
  } else if (str.charAt(0) === '8') {
    res = '+7' + str.slice(1);
  } else {
    res = str;
  }

  return res;
}