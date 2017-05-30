MAKEFLAGS += --warn-undefined-variables
SHELL := /bin/bash
.SHELLFLAGS := -eu -o pipefail -c
.DEFAULT_GOAL := build

NS = illuminateeducation
INSTANCE = default

# REPO ?= $(shell basename `git rev-parse --show-toplevel`)
REPO = survey
VERSION ?= $(shell basename `git rev-parse HEAD`)
BRANCH ?= $(shell basename `git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'`)
export REPO := ${REPO}
export VERSION := ${VERSION}
export NAME := ${REPO}
export BRANCH := ${BRANCH}

.PHONY: dep test migrate build tag push compose shell run start stop rm release

init: composer fixperm

dep: composer

test:
	vendor/bin/phpunit --coverage-clover build/logs/clover.xml

migrate:
	docker-compose -p surveys exec --user www-data php ./bin/console doc:mig:mig -n

diff:
	docker-compose -p surveys exec php ./bin/console doc:mig:diff

cc:
	docker-compose -p surveys run --user www-data php ./bin/console redis:flushall -n && docker-compose -p surveys run php artisan cache:clear

bash:
	docker-compose -p surveys exec php /bin/bash

network:
	docker network create $(NS)

build:
	docker build -f ./docker/php-fpm/Dockerfile -t quay.io/$(NS)/$(REPO):$(VERSION) .

tag:
	docker tag -f ./docker/php-fpm/Dockerfile quay.io/$(NS)/$(REPO):$(VERSION) quay.io/$(NS)/$(REPO):$(BRANCH)

push:
	docker push quay.io/$(NS)/$(REPO):$(VERSION)
	docker push quay.io/$(NS)/$(REPO):$(BRANCH)

compose:
	docker-compose -p=surveys up --build --force-recreate app mongo php nginx

composedie:
	docker-compose -p surveys stop app mongo php nginx
	docker-compose -p surveys rm app mongo php nginx

rebuild: composedie compose

shell:
	docker run --rm --name $(NAME)-$(INSTANCE) -i -t $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION) /bin/bash

run:
	docker run --rm --name $(NAME)-$(INSTANCE) $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

start:
	docker run -d --name $(NAME)-$(INSTANCE) $(PORTS) $(VOLUMES) $(ENV) $(NS)/$(REPO):$(VERSION)

stop:
	docker stop $(NAME)-$(INSTANCE)

rm:
	docker rm $(NAME)-$(INSTANCE)

: build
	make push -e VERSION=$(VERSION)

default: build

fixperm:
	docker-compose -p surveys run --rm --no-deps php chgrp -R www-data ./storage ./bootstrap/cache && chmod -R ug+rwx ./storage ./bootstrap/cache

composer:
	docker-compose -p surveys run --rm --no-deps -u illuminator workspace composer install -n

dev-load-env:
	cp .env.dev .env
	cp docker-compose.override.yml.dev docker-compose.override.yml

dev-init: dev-load-env init compose-workspace

dev-dep: composer

#dev-yarn:
#	docker-compose -p surveys run --rm --no-deps -u illuminator workspace yarn install --non-interactive

dev-bash:
	docker-compose -p surveys exec --user illuminator workspace /bin/bash

compose-workspace:
	docker-compose -p=surveys up -d --build --force-recreate workspace

composedie-workspace:
	docker-compose -p surveys stop workspace
	docker-compose -p surveys rm workspace

