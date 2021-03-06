FROM python:3.8-alpine
LABEL maintainer="bamboo2panda@gmail.com"

ENV PYTHONBUFFERED 1

COPY ./backend/requirements.txt ./backend/requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev
RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r ./backend/requirements.txt
RUN apk del .tmp-build-deps
WORKDIR /backend
COPY ./backend /backend
COPY ./docker/backend/production/wsgi-entrypoint.sh /backend/wsgi-entrypoint.sh

RUN mkdir -p /var/run/celery
RUN mkdir -p /var/log/celery

RUN chown -R celery:celery /var/log/celery/
RUN chown -R celery:celery /var/run/celery/

RUN chmod +x /backend/wsgi-entrypoint.sh
ENTRYPOINT ["sh", "/backend/wsgi-entrypoint.sh"]

RUN adduser -D user
USER user