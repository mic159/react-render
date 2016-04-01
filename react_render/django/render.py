from __future__ import absolute_import

import os
import logging
from django.contrib.staticfiles.storage import staticfiles_storage, HashedFilesMixin
from django.contrib.staticfiles.finders import find as find_static
from django.core.serializers.json import DjangoJSONEncoder
from django.utils.safestring import mark_safe
from django.utils.html import escapejs
from django.conf import settings
from react_render.core import render_component as render_core
from react_render.core import DEFAULT_SERVICE_URL

SERVICE_URL = getattr(settings, 'REACT_SERVICE_URL', DEFAULT_SERVICE_URL)
FAIL_SAFE = getattr(settings, 'REACT_FAIL_SAFE', False)

log = logging.getLogger('react-render-client')


class RenderedComponent(object):
    def __init__(self, output, path_to_source, props, json_encoder):
        self.output = output
        self.path_to_source = path_to_source
        self.props = props
        self.json_encoder = json_encoder

    def __str__(self):
        return mark_safe(self.output)

    def __unicode__(self):
        return mark_safe(self.output)

    def render_props(self):
        if self.props:
            encoded = escapejs(self.json_encoder(self.props))
            return mark_safe("JSON.parse('{0}')".format(encoded))
        return '{}'


def render_component(path_to_source, props=None, to_static_markup=False, json_encoder=None):
    if not os.path.isabs(path_to_source):
        # If its using the manifest staticfiles storage, to the hashed name.
        # eg. js/hello.js -> js/hello.d0bf07ff5f07.js
        if isinstance(staticfiles_storage, HashedFilesMixin):
            try:
                path_to_source = staticfiles_storage.stored_name(path_to_source)
            except ValueError:
                # Couldn't find it.
                pass
        # Now resolve it to the absolute path using the finders
        path_to_source = find_static(path_to_source) or path_to_source

    if json_encoder is None:
        json_encoder = DjangoJSONEncoder().encode

    try:
        html = render_core(path_to_source, props, to_static_markup, json_encoder, service_url=SERVICE_URL)
    except:
        if not FAIL_SAFE:
            raise
        log.exception('Error while rendering %s', path_to_source)
        html = ''

    return RenderedComponent(html, path_to_source, props, json_encoder)
