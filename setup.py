#! /usr/bin/env python3

from distutils.core import setup


setup(
    name='anonstats',
    version='latest',
    author='HOMEINFO - Digitale Informationssysteme GmbH',
    author_email='<info at homeinfo dot de>',
    maintainer='Richard Neumann',
    maintainer_email='<r dot neumann at homeinfo period de>',
    requires=['his'],
    packages=['anonstats'],
    description='HOMEINFO anonymous websites statistics system.')