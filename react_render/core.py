import os
import json
import requests
from react_render.exceptions import ComponentSourceFileNotFound, ComponentRenderingError

DEFAULT_SERVICE_URL = 'http://localhost:63578/render'


def render_component(path_to_source, props=None, to_static_markup=False, json_encoder=None, service_url=None):
    if not os.path.exists(path_to_source):
        raise ComponentSourceFileNotFound(path_to_source)

    if json_encoder is None:
        json_encoder = json.dumps

    if service_url is None:
        service_url = DEFAULT_SERVICE_URL

    response = requests.post(service_url,
        timeout=10.0,
        headers={'Content-Type': 'application/json'},
        data=json_encoder({
            'props': props,
            'path_to_source': path_to_source,
            'to_static_markup': to_static_markup,
        }))

    if response.status_code != 200:
        raise ComponentRenderingError(response.text)

    return response.text
