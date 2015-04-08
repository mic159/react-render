Django + React + Webpack demo
=============================

This demo illustrates how:
- A single codebase can be used to generate server-side 
rendered HTML as well client-side interactivity.
- To pre-render HTML so that you can optimise for search-engines.
- Server-side rendering enables you to gracefully-degrade 
interactive features on clients without JavaScript enabled.


Install
-------

```bash
# In the /example directory

mkvirtualenv react-render-demo
pip install -r requirements.txt

# Install the nodejs service
npm install

# Compile Javascript bundles
npm run build

# Start the node server that we use to render and bundle components
npm run react-service

# In another terminal, start the django devserver
./manage.py runserver
```

And visit http://127.0.0.1:8000

**Note** If you make changes to the app's JS codebase, you will need to re-run `npm run build` or instead use
`npm run watch` that will automatically rebuild when there are changes. The react-service will automatically reload
the bundles after webpack has changed them.
