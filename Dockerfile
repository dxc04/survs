FROM php:7.1-fpm

ARG BUILD_ENV

ENV PHPREDIS_VERSION 3.0.0
ENV MONGODB_VERSION 1.2.9

RUN echo "ENVIRONMENT::$BUILD_ENV"
RUN if [ "${BUILD_ENV}" = "development" ]; then echo "${BUILD_ENV}"; fi

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
        libpq-dev \
        libmcrypt-dev \
        git \
        vim \
    && docker-php-ext-install \
        # Install PHP Extensions
        pdo \
        pdo_pgsql \
        pdo_mysql \
        mcrypt \
        pgsql \
        opcache \
    && apt-get clean \
    && rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/*

# Install mongo
RUN mkdir -p /usr/src/php/ext/mongodb \
    && curl -L https://pecl.php.net/get/mongodb-$MONGODB_VERSION.tgz | tar xvz -C /usr/src/php/ext/mongodb --strip 1 \
    && echo 'mongodb' >> /usr/src/php-available-exts \
    && docker-php-ext-install mongodb

#RUN pecl install mongodb \
#    && echo 'mongodb' >> /usr/src/php-available-exts \
#    && docker-php-ext-install mongodb

# Install phpredis
RUN mkdir -p /usr/src/php/ext/redis \
    && curl -L https://github.com/phpredis/phpredis/archive/$PHPREDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis

RUN mkdir -p /var/www/service
VOLUME /var/www/service

WORKDIR /var/www/service

COPY . ./
COPY ./docker/container/php-fpm/docker-entrypoint.sh /
COPY ./docker/docker-fs/www.conf /usr/local/etc/php-fpm.d/www.conf

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["php-fpm", "-F"]    
