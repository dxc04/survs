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
	docker-compose exec --user www-data php ./bin/console doc:mig:mig -n

diff:
	docker-compose exec php ./bin/console doc:mig:diff

cc:
	docker-compose exec --user www-data php ./bin/console redis:flushall -n && docker-compose exec php rm -rvf var/cache/*

bash:
	docker-compose exec php /bin/bash

network:
	docker network create $(NS)

build:
	docker build -t quay.io/$(NS)/$(REPO):$(VERSION) .

tag:
	docker tag quay.io/$(NS)/$(REPO):$(VERSION) quay.io/$(NS)/$(REPO):$(BRANCH)

push:
	docker push quay.io/$(NS)/$(REPO):$(VERSION)
	docker push quay.io/$(NS)/$(REPO):$(BRANCH)

compose:
	docker-compose up --build --force-recreate

composedie:
	docker-compose rm -f php

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
