FROM python:3.8-alpine
LABEL maintainer="bamboo2panda@gmail.com"

ENV PYTHONBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgres-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc lib-dev linux-headers postgres-dev musl-dev zlib zlib-dev
RUN pip install -r /requirements.txt
RUN apk del .tmp-build-daps

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN adduser -D user
USER user