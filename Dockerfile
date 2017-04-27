FROM php:fpm

ENV PHPREDIS_VERSION 3.0.0

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

RUN mkdir -p /usr/src/php/ext/redis \
    && curl -L https://github.com/phpredis/phpredis/archive/$PHPREDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis

RUN mkdir -p /var/www/service
VOLUME /var/www/service

WORKDIR /var/www/service

COPY . ./
COPY docker-entrypoint.sh /
COPY docker-fs/www.conf /usr/local/etc/php-fpm.d/www.conf

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["php-fpm", "-F"]    
