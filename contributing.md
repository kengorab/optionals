Contributors
============

If you find something wrong with this library, or have something you'd like to add, I'm more than happy to accept pull
requests.
____

## Environment Setup

There's really not a whole lot of setup. You'll need typescript and [tsd](http://definitelytyped.org/tsd/), so go ahead
and install those if you don't already have them.

    npm install -g tsc tsd

You'll also need to run `npm install` if you haven't already.

I have `tsc -w` watching `src/` (where the library is), and it outputs `lib/option.d.ts`, `lib/option.js`,
and `lib/option.js.map`. `lib/index.js` is not generated automatically.

## Testing

There's a bunch of test files in `test/`, at the time of writing there is one file for each function. I'd like to keep
that organization if possible, but if not then whatever. Tests are run using `mocha`, and can be run with `npm test`.
Pull requests that add functionality and no unit tests will not be accepted.

It would be great if you could set up [travis](http://travis-ci.org) for your fork as well, so the tests will run prior
to being merged in with master.

## Thank you
kengorab
