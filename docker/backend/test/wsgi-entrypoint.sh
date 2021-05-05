#!/bin/sh

until cd /backend
do 
    echo "Wait for server volume..."
done


until ./manage.py makemigrations
do 
    echo "Wait for migrations ready..."
done


until ./manage.py migrate
do
    echo "Wait for db to be ready..."
    sleep 2
done

./manage.py test
# ./manage.py collectstatic --noinput
# DEBUG=True ./manage.py runserver 0.0.0.0:8000