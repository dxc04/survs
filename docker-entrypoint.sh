#!/bin/bash
set -e

chown -R www-data:www-data /var/www/service/storage
chmod -R 770 /var/www/service/storage

if [ "${1:0:1}" = '-' ]; then
	set -- php-fpm "$@"
fi

exec "$@"
