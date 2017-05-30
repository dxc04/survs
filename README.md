# Surveys
[![Build Status](https://travis-ci.com/illuminateeducation/surveys.svg?token=HV3QNmWoiU9TqhNRL3DS&branch=master)](https://travis-ci.com/illuminateeducation/surveys)
[![Docker Repository on Quay](https://quay.io/repository/illuminateeducation/surveys/status?token=08b70eb6-cb81-43e4-a9e4-3208e0386768 "Docker Repository on Quay")](https://quay.io/repository/illuminateeducation/surveys)

DnA Surveys

### Additional Application Requirements
 * Database: MongoDB 3.4
 * PHP Extensions: `php-mongodb`

### Prerequisites

| Vendor | Version | Link(s) |
| - | - | - |
| Docker CE | 17.03.1-ce | [ Install Guide(Step 1) ](https://docs.docker.com/engine/installation/#docker-editions) <br /> [ Install Guide(Step 2) ](https://docs.docker.com/engine/installation/linux/linux-postinstall/) |
| Docker Compose | 1.12.0 | [ Install Guide ](https://docs.docker.com/compose/install/) |

### Install

## Dev Setup
```sh
> git clone git@github.com:illuminateeducation/surveys.git surveys
> cd surveys
> make dev-init
```

## Live Setup
```sh
> git clone git@github.com:illuminateeducation/surveys.git surveys
> cd surveys
> (Load app .env file, see .env.dev for example. Make sure APP_KEY exists.) 
> make init
```

## Run Nginx, PHP-FPM, MongoDB Containers
```sh
> make network
> (Update docker-compose.override.yml for tweaks, see docker-compose.override.yml.dev for example)
> make compose
```

### Workspace Docker Container
 * Contains tools like nodejs, npm, yarn, composer

## Connect to workspace
```sh
> make dev-bash
```

## Run composer
```sh
> make composer
```

### Conventions
 * Collection name is in plural form, e.g. `users`.
 * Collection's primary key is `id`.
 * Reference column's name is the singular form of the collection followed by `_id`, e.g. `user_id`.
 * Model class name is the singular form of the collection. e.g. `User`.
 * Models extend `App\Models\AbstractModel`.
 * Models use `App\Models` for namespace.
 
### Tools
* See `php artisan make:model --help` for creating models. Example: `php artisan make:model 'Models\User'`
* Run `php artisan db:seed --class=SurveyFakeDataSeeder` to generate sample survey, question, roster and responses.
