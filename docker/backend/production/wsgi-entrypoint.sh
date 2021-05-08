#!/bin/sh

until cd /backend
do 
    echo "Wait for server volume..."
done

until ./manage.py migrate
do
    echo "Wait for db to be ready..."
    sleep 2
done

./manage.py collectstatic --noinput



celery multi start w1 -A app -l INFO --pidfile=/var/run/celery/%n.pid \
                                        --logfile=/var/log/celery/%n%I.log


gunicorn app.wsgi --bind 0.0.0.0:8000 --workers 4 --threads 4