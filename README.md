React Render
============

Render React components on the server side in Django, also called "isomorphic React".
You would do this for faster page loads, to make it friendlier to web crawlers and for SEO.

Example
-------

```python
from react_render.django.render import render_component

props = {
    'foo': 'bar',
    'woz': [1,2,3],
}

rendered = render_component('path/to/component.js', props=props)

print(rendered)
```

How it works
------------

It works by having a NodeJS service on the same server that can render the React components.
The Python just uses a simple HTTP API to send the context and the file path over to the service, and it responds with
 the rendered HTML.

Documentation
=============

- [Installation](#installation)
- [render_component()](#render_component)
- [RenderedComponent](#renderedcomponent)
- [Running the tests](#running-the-tests)
- [react-service settings](#react-service-settings)

Installation
------------

```bash
npm install react-render-service --save
pip install react-render-client
```

_Optional:_ Point it to the service in your settings.py

```python
REACT_SERVICE_URL = 'http://localhost:63578/render'
```

Start the node server which hosts the renderer.

```bash
react-service --debug
```

render_component()
------------------

Renders a component to its initial HTML.

Returns a `RenderedComponent` instance, which can be passed directly into templates 
to output the component's HTML.

Arguments:

- `path_to_source` — a path to a JS file which exports the component. If the 
  path is relative, django's static file finders will be used to find the file.
  *NOTE* Must be compiled JS, not JSX.
- `props` *optional* — a dictonary that will be serialised to JSON and passed to 
  the component during the renderering process.
- `to_static_markup` *optional* — a boolean indicating that React's `renderToStaticMarkup`
  method should be used for the rendering. Defaults to `False`, which causes React's 
  `renderToString` method to be used.
- `json_encoder` *optional* — a class which is used to encode the JSON which is sent to the 
  renderer. Defaults to `django.core.serializers.json.DjangoJSONEncoder`.


RenderedComponent
-----------------

The result of rendering a component to its initial HTML. RenderedComponents can be passed
directly into templates where they output the generated HTML.

```python
# Render the component
my_component = render_component(...)

# Print the generated HTML
print(my_component)
```
```html
<!-- Insert the generated HTML into your template -->
{{ my_component }}
```

RenderedComponents have a helper method, `render_props`, which outputs your JSON-serialized 
props. This allows you to reuse the encoded form of your props on the client-side.

```html
<script>
    var myProps = {{ my_component.render_props }};
</script>
```

react-service settings
----------------

- `--host` Bind to a different interface, by default this is localhost.
- `--port` Bind to a different port. By default it is `63578`
- `--watch` Enable developer mode where it will automatically re-load the bundles if they change.
- `--whitelist` Restrict the directory that the service can access.
  By default, the service will attempt to load any arbitrary path it is given.
  Can also be set via the `REACT_WHITELIST` environment variable.


Running the tests
-----------------

```bash
mkvirtualenv react-render
pip install -e .
cd tests
npm install
npm run build
cd ..
node renderer.js &
python runtests.py
```
