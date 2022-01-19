"""Object relational mappings."""

from datetime import datetime

from peewee import ForeignKeyField, DateTimeField, CharField, TextField

from mdb import Customer
from peeweeplus import JSONModel, MySQLDatabaseProxy


__all__ = ['AnonStats', 'CustomerDomain']


DATABASE = MySQLDatabaseProxy('anonstats')


class AnonStatsModel(JSONModel):
    """Basic model."""

    class Meta:     # pylint: disable=C0115,R0903
        database = DATABASE
        schema = database.database


class AnonStats(AnonStatsModel):
    """Anonymous statistics entry."""

    timestamp = DateTimeField(default=datetime.now)
    host = CharField(255)
    url = TextField()


class CustomerDomain(AnonStatsModel):
    """Maps domains and customers."""

    customer = ForeignKeyField(Customer, column_name='customer')
    domain = CharField(255)
