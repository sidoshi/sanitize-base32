import { sanitize } from '../src';

test('uses alias for unsupported ambigious characters', () => {
  expect(sanitize('018')).toEqual('OLB');
  expect(sanitize('0185757ABC810')).toEqual('OLB5757ABCBLO');

  expect(sanitize('018', { aliases: null })).toEqual('');
  expect(
    sanitize('018', { aliases: { '0': 'o', '1': 'l', '8': 'b' } })
  ).toEqual('olb');
});

test('ignores unsupported characters', () => {
  expect(sanitize('abcs\t \n 189')).toEqual('LB');
  expect(sanitize('ABCD EFGH IJKL MNOP')).toEqual('ABCDEFGHIJKLMNOP');
  expect(() =>
    sanitize('ABCD EFGH IJKL MNOP', { ignoreInvalid: false })
  ).toThrow('Invalid base32 character:  ');

  expect(() => sanitize('a', { ignoreInvalid: false })).toThrow(
    'Invalid base32 character: a'
  );
});

test('prefers supported characters over aliases', () => {
  expect(
    sanitize('ABA', {
      aliases: {
        A: 'B',
        B: 'A',
      },
    })
  ).toEqual('ABA');
});

test('handles padding', () => {
  expect(sanitize('ABA==')).toEqual('ABA');
  expect(sanitize('ABA==', { removePadding: false })).toEqual('ABA==');
});
