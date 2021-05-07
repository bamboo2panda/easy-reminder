#!/bin/sh

until cd /backend
do 
    echo "Wait for server volume..."
done

until export DJANGO_SETTINGS_MODULE=app.settings
do 
    echo "Wait for apps..."
done

celery -A app worker -l INFO -B