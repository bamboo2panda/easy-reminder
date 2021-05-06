#!/bin/sh

until cd /backend
do 
    echo "Wait for server volume..."
done

celery -A app worker -l INFO -B