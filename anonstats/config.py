"""Configuration file parsing."""

from configlib import INIParser

__all__ = ['CONFIG']


CONFIG = INIParser('/usr/local/etc/anonstats.conf')
