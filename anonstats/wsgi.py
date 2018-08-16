"""WSGI services."""

from datetime import timedelta

from flask import request
from werkzeug.local import LocalProxy

from his import ACCOUNT, CUSTOMER, authenticated, authorized
from timelib import strpdate
from wsgilib import Application, JSON

from anonstats.orm import AnonStats, CustomerDomain

__all__ = ['APPLICATION']


APPLICATION = Application('anonstats', cors=True, debug=True)


def _get_domains():
    """Yields the customer's domains."""

    for customer_domain in CustomerDomain.select().where(
            CustomerDomain.customer == CUSTOMER.id):
        yield customer_domain.domain


DOMAINS = LocalProxy(_get_domains)


def _get_stats(start, end):
    """Returns the stats from start to end."""

    if ACCOUNT.root:
        expression = True
    else:
        expression = AnonStats.host << DOMAINS

    if start is not None:
        expression &= AnonStats.timestamp >= start

    if end is not None:
        expression &= AnonStats.timestamp <= end + timedelta(days=1)

    return AnonStats.select().where(expression)


@authenticated
@authorized('anonstats')
def list_():
    """Lists statistics for the current customer."""
    try:
        start = strpdate(request.args.get('start'))
        end = strpdate(request.args.get('end'))
    except ValueError:
        return ('Invalid date.', 400)

    return JSON([
        anon_stats.to_json(autofields=False)
        for anon_stats in _get_stats(start, end)])


ROUTES = (('GET', '/', list_, 'list_stats'),)
APPLICATION.add_routes(ROUTES)
