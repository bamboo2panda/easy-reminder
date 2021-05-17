# easy-reminder

Reminder app based on Django, ReactJS and Celery.  
Users can create notifications and recieve them on email when time comes. 

## How to install
1. Clone project to your Docker server
1. Fill *backend/.env.dist* and *frontend/.env.dist* and rename them to .env
3. Run *docker-compose up --build* (or *docker-compose -f docker-compose-dev.yml up --build* if you have issues) 

## Run backend tests:
```
docker-compose -f docker-compose-test-backend.yml run --rm backend
```

## Try it yourself
[http://do.2dpo.ru](http://do.2dpo.ru)