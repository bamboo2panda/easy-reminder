import time

from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Django command to pause execution until db is available"""

    def handle(self, *args, **kwargs):
        self.stdout.write('Waiting for database...')
        db_connection = None
        while not db_connection:
            try:
                db_connection = connections['default']
            except OperationalError:
                self.stdout.write('Database is unavailable waite 1 second')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available!'))
