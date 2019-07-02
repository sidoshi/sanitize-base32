# Sanitize base-32 encoded strings

Base-32 strings only allow capital alphabets (A-Z), integers (2-7) and padding
using equals sign (=). This library can be used to sanitize an encoded base32
string to ensure that it can be safely decoded.

The default implementation strips all unsupported characters (including whitespace) and uses alias toreplace ambigious characters. This behaviour is configurable.

## Install

```bash
npm i sanitize-base32
```

## Usage

```js
import {sanitize} from 'sanitize-base32'

console.log(sanitize('AABA CDEF GGHU QQRL'))
// => AABA CDEF GGHU QQRL

```

## API

### sanitize(options?: Options): string

Takes an optional `options` argument and returns a sanitized base-32 string.

#### options.ignoreInvalid: boolean (default: true)

By default, when an invalid character is found, the sanitizer simply ignores it
from the result. Setting this to false will raise an error instead.

#### options.aliases: object | null (default: {0: 'O', 1: 'L', 8: 'B'})

Specify the aliases to use for ambigous unsupported characters. Alias checks
are only performed for unsupported characters. If the character is a valid
base-32 character, it is given preference over alias.

To turn of aliases pass `null`. The aliases object must be a flat object mapping
single character to a single character.

#### options.removePadding: boolean (default: true)

Base-32 strings are padded using `=` sign to allow assumptions about the size
of the string. But that is not required for all use cases. By default, the
sanitizer removes the padding. Set to `false` to preserve padding.

## Licence

MIT © [Siddharth Doshi](https://sid.sh)
 