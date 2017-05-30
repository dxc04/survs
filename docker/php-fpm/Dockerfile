FROM php:7.1-fpm

ARG BUILD_ENV=live
ENV BUILD_ENV ${BUILD_ENV}

# Update & Upgrade
RUN apt-get update \
    && apt-get upgrade -y

RUN echo "ENVIRONMENT::$BUILD_ENV"
RUN if [ "${BUILD_ENV}" = "dev" ]; then echo "${BUILD_ENV}"; fi

# Install "PHP Extentions", "libraries", "Software's"
USER root
RUN apt-get install -y \
    curl \
    libmemcached-dev \
    libz-dev \
    libpq-dev \
    libjpeg-dev \
    libpng12-dev \
    libfreetype6-dev \
    libssl-dev \
    libmcrypt-dev \
    git \
    zip \
    unzip

# Install PHP Extensions
USER root
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pdo_mysql \
    mcrypt \
    pgsql \
    opcache \
    bcmath \
    zip
RUN docker-php-ext-configure gd \
        --enable-gd-native-ttf \
        --with-jpeg-dir=/usr/lib \
        --with-freetype-dir=/usr/include/freetype2 \
    && docker-php-ext-install gd

# Install mongo
USER root
ARG MONGODB_VERSION=1.2.9
ENV MONGODB_VERSION ${MONGODB_VERSION}
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb
#RUN mkdir -p /usr/src/php/ext/mongodb \
#    && curl -L https://pecl.php.net/get/mongodb-$MONGODB_VERSION.tgz | tar xvz -C /usr/src/php/ext/mongodb --strip 1 \
#    && echo 'mongodb' >> /usr/src/php-available-exts \
#    && docker-php-ext-install mongodb

# Install phpredis
USER root
ARG PHPREDIS_VERSION=3.0.0
ENV PHPREDIS_VERSION ${PHPREDIS_VERSION}
RUN pecl install -o -f redis \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis
# RUN mkdir -p /usr/src/php/ext/redis \
#     && curl -L https://github.com/phpredis/phpredis/archive/$PHPREDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
#     && echo 'redis' >> /usr/src/php-available-exts \
#     && docker-php-ext-install redis

# Install dev stuff
RUN if [ ${BUILD_ENV} = 'dev' ]; then \
    pecl install xdebug \
    && docker-php-ext-enable xdebug \
;fi

# Copy files to container
USER root
COPY ./docker-entrypoint.sh /
COPY ./www.conf.${BUILD_ENV} /usr/local/etc/php-fpm.d/www.conf

# Setup App
#USER root
#RUN mkdir -p /var/www/service
#VOLUME /var/www/service
WORKDIR /var/www/service
#COPY . ./
#RUN chgrp -R www-data \
#        /var/www/service/storage \
#        /var/www/service/bootstrap/cache \
#    && chmod -R ug+rwx \
#        /var/www/service/storage \
#        /var/www/service/bootstrap/cache

# Clean up
USER root
RUN apt-get clean \
    && rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/*

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["php-fpm", "-F"]    
