#!/bin/bash
set -e

chown -R www-data:www-data /var/www/service/storage /var/www/service/bootstrap/cache
chmod -R 770 /var/www/service/storage /var/www/service/bootstrap/cache

if [ "${1:0:1}" = '-' ]; then
	set -- php-fpm "$@"
fi

exec "$@"
