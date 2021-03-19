import os
import json
import threading

import requests
from react_render.exceptions import ComponentSourceFileNotFound, ComponentRenderingError

DEFAULT_SERVICE_URL = 'http://localhost:63578/render'

_requests_session_store = threading.local()


def requests_keepalive_session() -> requests.Session:
    """
    Creates a session that can utilize keep-alive behaviour across multiple
    requests, by maintaining the session within a thread-local.
    """
    session = getattr(_requests_session_store, "react_session", None)
    if not session:
        session = requests.Session()
        setattr(_requests_session_store, "react_session", session)
    return session


def render_component(path_to_source, props=None, to_static_markup=False, json_encoder=None, service_url=None, timeout=10):
    if not os.path.exists(path_to_source):
        raise ComponentSourceFileNotFound(path_to_source)

    if json_encoder is None:
        json_encoder = json.dumps

    if service_url is None:
        service_url = DEFAULT_SERVICE_URL

    session = requests_keepalive_session()
    response = session.post(service_url,
        timeout=timeout,
        headers={'Content-Type': 'application/json'},
        data=json_encoder({
            'props': props,
            'path_to_source': path_to_source,
            'to_static_markup': to_static_markup,
        }))

    if response.status_code != 200:
        raise ComponentRenderingError(response.text)

    return response.text
