interface Options {
  ignoreInvalid: boolean;
  removePadding: boolean;
  aliases: { [key: string]: string } | null;
}

const defaultOptions: Options = {
  ignoreInvalid: true,
  removePadding: true,
  aliases: {
    '0': 'O',
    '1': 'L',
    '8': 'B',
  },
};

export function sanitize(str: string, options: Partial<Options> = {}) {
  const opts = { ...defaultOptions, ...options };
  const chars = str.split('');

  const result: string[] = [];

  for (const char of chars) {
    if (/[A-Z2-7=]/.test(char)) {
      if (char === '=' && opts.removePadding) {
        continue;
      }
      result.push(char);
    } else if (opts.aliases && opts.aliases[char]) {
      result.push(opts.aliases[char]);
    } else if (opts.ignoreInvalid) {
      continue;
    } else {
      throw new Error(`Invalid base32 character: ${char}`);
    }
  }

  return result.join('');
}

export default sanitize;
