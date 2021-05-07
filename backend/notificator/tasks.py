from rest_framework import viewsets
from celery import shared_task
from core.models import Event
from .mailSender import mailSender
import datetime
import pytz

utc=pytz.UTC


@shared_task
def listEvents():
    model = Event
    queryset = model.objects.all()
    q = queryset.filter()
    print(q)
    print('!!!!!!!!!!!!!!!!!!!!!')
    
    now = utc.localize(datetime.datetime.now())

    margin = datetime.timedelta(seconds = 30)
    nowplusone = now + margin
    nowminusone = now - margin

    for event in q:
        print(event.date_time)
        print(f'-----User: {event.user}')
        if nowminusone < event.date_time < nowplusone:
            mailSender(str(event.user), f'{event.name} \n {event.date_time}')
            
    