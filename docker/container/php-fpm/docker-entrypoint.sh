#!/bin/bash
set -e

chgrp -R www-data /var/www/service/storage /var/www/service/bootstrap/cache /var/www/service
chmod -R ug+rwx /var/www/service/storage /var/www/service/bootstrap/cache
php /var/www/service/artisan config:cache

if [ "${1:0:1}" = '-' ]; then
	set -- php-fpm "$@"
fi

exec "$@"
