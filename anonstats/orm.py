"""Object relational mappings."""

from datetime import datetime

from peewee import AutoField, ForeignKeyField, DateTimeField, CharField, \
    TextField

from mdb import Customer
from peeweeplus import MySQLDatabase, JSONModel, JSONField

from anonstats.config import CONFIG


DATABASE = MySQLDatabase.from_config(CONFIG['db'])


class _AnonStatsModel(JSONModel):
    """Basic model."""

    class Meta:
        database = DATABASE
        schema = database.database

    id = JSONField(AutoField)


class AnonStats(_AnonStatsModel):
    """Anonymous statistics entry."""

    timestamp = JSONField(DateTimeField, default=datetime.now)
    host = JSONField(CharField, 255)
    url = JSONField(TextField)


class CustomerDomain(_AnonStatsModel):
    """Maps domains and customers."""

    customer = JSONField(ForeignKeyField, Customer, column_name='customer')
    domain = JSONField(CharField, 255)
