from setuptools import setup, find_packages

VERSION = '1.0.0'

setup(
    name='react-render-client',
    version=VERSION,
    packages=find_packages(exclude=['example', 'tests']),
    install_requires=[
        'django>=1.6',
        'requests>=2',
    ],
    description='Render and bundle React components from a Django application',
    long_description='Documentation at https://github.com/mic159/react-render',
    author='Michael Cooper',
    author_email='mic159@gmail.com',
    url='https://github.com/mic159/react-render',
    download_url='https://github.com/mic159/react-render/tarball/{}'.format(VERSION),
    keywords=['react', 'reactjs', 'django', 'isomorphic', 'templates'],
    license='MIT',
    classifiers=[
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Topic :: Software Development',
    ]
)
