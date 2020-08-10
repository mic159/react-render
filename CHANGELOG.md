Changelog
=========

### 1.3.2

Python package bumped to 1.3.2:
- Add a configurable timeout using the setting `REACT_TIMEOUT`

*Note:* JS only release. Python package remains at 1.3.1

### 1.3.1

Python package bumped to 1.3.1:
- Attempt to resolve static content at STATIC_ROOT where content should have
  been collected.
- No longer testing python 2 & Django 1.11

Nodejs package 1.3.1:
- Bump dependencies

### 1.3.0

Update React to version 16.8.6

*Note:* JS only release. Python package remains at 1.0.0

### 1.2.1

Allow chained express middleware.
This will allow you to impliment things like Newrelic monitoring.

*Note:* JS only release. Python package remains at 1.0.0


### 1.2.0

Update react to 16.4 to support fragments.

*Note:* JS only release. Python package remains at 1.0.0


### 1.1.1

Revert to non-streaming API due to performance degredation.

*Note:* JS only release. Python package remains at 1.0.0

### 1.1.0

Upgrade to React 16

- Drop support for react `0.14.x`
- Switch react to version 16
- Use the new streaming render API for faster TTFB

*Note:* JS only release. Python package remains at 1.0.0

### 1.0.0

Upgraded to React 15

*Note:* This should still work with components written in react `0.14.x`, but will show a warning
from react about re-rendering over existing HTML.
This is because of a change to ReactDOM, where it no longer inserts `data-reactid` tags in the markup.
Read more here: https://facebook.github.io/react/blog/2016/04/07/react-v15.html

### 0.13.1

- Support `export default` ES6 style component exports.
- Show JS error message in python exception when not in debug mode.
- Updated some dependencies
  - `body-parser` 1.14.1 > 1.15.2
  - `express` 4.13.3 > 4.14.0
  - `morgan` 1.6.1 > 1.7.0
- Updated example and tests to use babel 6.

*NOTE: Only JS changed in this release*

### 0.13.0

Fixed a potential XSS bug when using `render_props` as per the example.
This changes the output of `render_props` to be `JSON.parse("[escapedJsonString]")`.

**Potentially Breaking Change:** This could potentially break if you are using `render_props` in any way other
than to put things into a script tag.

*NOTE: Only the python code changed in this release*

### 0.12.5

- Support manifest staticfiles storage classes by resolving the hashed name of files.
  ie. `js/hello.js` to `js/hello.d0bf07ff5f07.js`.

*NOTE: Only the python code changed in this release*

### 0.12.4

- Allow binding to other interfaces

*NOTE: Only JS changed in this release*

### 0.12.3

- Add a directory whitelist option to restrict where the service can load from
  Can be set by either CLI switch: `--whitelist /some/path`
  Or by environment variable: `REACT_WHITELIST=/some/path react-service`

*NOTE: Only JS changed in this release*

### 0.12.2

- Larger request limit for react-render-service

*NOTE: Only JS changed in this release*

### 0.12.1

- Allow ES6 style React components

*NOTE: Only JS changed in this release*

### 0.12.0

- Bump dependencies
- Update to React 0.14.2
- **Removed support for JSX** files being directly rendered
- Fail-safe for Django
  - When the server fails to render, return an empty placeholder, and allow the client to fill the gap.
  - Great for production where the service may go down.

### 0.11.0 (2015-04-11)

- Decouple from Django.
  - `react_render.core.render_component` is pure python
  - `react_render.django.render_component` is a Django wrapper to make it easier to use
  - Added a deprecation warning on `react_render.render`

### 0.10.3 (2015-04-08)

- Bump to update packaging information

### 0.10.2 (2015-04-08)

- First release under react-render
- Simplify & decouple from several other libraries
