import os

# DJANGO
# ======

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DEBUG = True

TEMPLATE_DEBUG = DEBUG

SECRET_KEY = '_'

INSTALLED_APPS = (
    'django.contrib.staticfiles',
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder'
)

MIDDLEWARE_CLASSES = ()

ROOT_URLCONF = 'djangosite.urls'

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# EXAMPLE APP
# ===========

INSTALLED_APPS += (
    'example_app',
)
