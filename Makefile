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

dep:
	composer install -n
	npm install

test:
	vendor/bin/phpunit --coverage-clover build/logs/clover.xml

migrate:
	docker-compose --project-name surveys exec --user www-data php ./bin/console doc:mig:mig -n

diff:
	docker-compose --project-name surveys exec php ./bin/console doc:mig:diff

cc:
	docker-compose --project-name surveys exec --user www-data php ./bin/console redis:flushall -n && docker-compose --project-name surveys exec php rm -rvf var/cache/*

bash:
	docker-compose --project-name surveys exec php /bin/bash

bashdev:
	docker-compose --project-name=surveys exec --user=illuminator workspace /bin/bash

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
	docker-compose --project-name=surveys up --build --force-recreate

composedie:
	docker-compose --project-name=surveys rm

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

release: build
	make push -e VERSION=$(VERSION)

default: build

fixperm:
	docker-compose --project-name surveys exec php chgrp -R www-data ./storage ./bootstrap/cache && chmod -R ug+rwx ./storage ./bootstrap/cache

composerdev:
	docker-compose --project-name surveys exec --user illuminator workspace composer install
