# Используем официальный образ PHP версии 8.1
FROM ubuntu:22.04

WORKDIR /var/www/html

ENV TZ="Europe/Chisinau"

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -y \
    wget \
    apache2 \
    mlocate \
    gzip \
    curl

RUN cd ~
RUN curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh

RUN apt-get -y install nodejs  

RUN npm install -g pnpm

CMD apachectl -D FOREGROUND