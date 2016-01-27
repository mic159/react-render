Changelog
=========



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
