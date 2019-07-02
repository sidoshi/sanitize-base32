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
  expect(sanitize('@#QRa9\t \n 189')).toEqual('QRALB');
  expect(sanitize('ABCD EFGH IJKL MNOP')).toEqual('ABCDEFGHIJKLMNOP');
  expect(() =>
    sanitize('ABCD EFGH IJKL MNOP', { ignoreInvalid: false })
  ).toThrow('Invalid base32 character:  ');

  expect(() => sanitize('#', { ignoreInvalid: false })).toThrow(
    'Invalid base32 character: #'
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

test('transforms to uppercase', () => {
  expect(sanitize('wrha pahv 5ce4')).toEqual('WRHAPAHV5CE4');
});
