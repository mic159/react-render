import os

# DJANGO
# ======

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

DEBUG = True

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

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [os.path.join(BASE_DIR, 'templates')],
    'APP_DIRS': True,
    'OPTIONS': {
        'context_processors': [
            'django.template.context_processors.debug',
            'django.template.context_processors.request',
        ],
    },
}]

# EXAMPLE APP
# ===========

INSTALLED_APPS += (
    'example_app',
)
