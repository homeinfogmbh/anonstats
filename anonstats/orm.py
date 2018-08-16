"""Object relational mappings."""

from datetime import datetime

from peewee import ForeignKeyField, DateTimeField, CharField, TextField

from mdb import Customer
from peeweeplus import MySQLDatabase, JSONModel

from anonstats.config import CONFIG


DATABASE = MySQLDatabase.from_config(CONFIG['db'])


class _AnonStatsModel(JSONModel):
    """Basic model."""

    class Meta:
        database = DATABASE
        schema = database.database


class AnonStats(_AnonStatsModel):
    """Anonymous statistics entry."""

    timestamp = DateTimeField(default=datetime.now)
    host = CharField(255)
    url = TextField()


class CustomerDomain(_AnonStatsModel):
    """Maps domains and customers."""

    customer = ForeignKeyField(Customer, column_name='customer')
    domain = CharField(255)
