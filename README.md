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
| Node.js | 7.8.0 | [ Install Guide ](https://nodejs.org/en/download/package-manager/) |
| npm | 4.2.0 | [ Install Guide ](https://docs.npmjs.com/getting-started/installing-node) |
| Docker CE | 17.03.1-ce | [ Install Guide(Step 1) ](https://docs.docker.com/engine/installation/#docker-editions) <br /> [ Install Guide(Step 2) ](https://docs.docker.com/engine/installation/linux/linux-postinstall/) |
| Docker Compose | 1.12.0 | [ Install Guide ](https://docs.docker.com/compose/install/) |

## Install
```sh
> git clone git@github.com:illuminateeducation/surveys.git surveys
> cd surveys
> composer install
> npm install
> cp .env.example .env 
> php artisan key:generate
> php artisan config:cache
> make network
> make compose
```
or
```sh
> git clone git@github.com:illuminateeducation/surveys.git surveys
> cd surveys
> make dep
> make network
> make compose
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


### ReactJs
* Make sure to install the required packages `npm install`. You may want to delete `node_modules` folder before installing to make sure you only have the needed packages.
* Run `npm run dev` to load all necessary assets and React packages.
* Run `npm run watch` to automatically transpile any changes in your react or jsx files.
* See more info on handling assets at https://laravel.com/docs/5.4/mix#running-mix
* You can access for survey creation using `survey/create` route. Example. `http://localhost/survey/create`
* You can access the published survey using `survey/publish` route. Example. `http:://localhost/survey/publish`

### React Components
<<<<<<< HEAD
* All ReactJs components are located at `./resources/assets/js/components/`.
* `build-survey-render.jsx` which renders the entire create survey page is at `./resources/assets/js/build-survey-render.jsx`
* `publish-survey-render.jsx` which renders the entire publish survey page is at `./resources/assets/js/publish-survey-render.jsx` 

 ```
 build-survey-render.jsx
 |_ SurveyBuilder (survey-builder.jsx)
      |_ Survey (survey.jsx)
           |_ Information (information.jsx)
           |_ Question (question.jsx)
                |_ (Question Types Components - multiple_choice, checkboxes, etc.) 
 ```
 
 ### React Conventions
 * File names are all lower case and hyphen separated. Component name is then `UpperCamelCase` Example. `survey.jsx` -> `Survey` , `survey-builder.jsx` -> `SurveyBuilder`
 * All components must recide at `./resources/assets/js/components/`. Create new folders in `components` folder if necessary. `question_types` folder is already created to hold components for different question types.
 
 ### Survey Component Data Structure
 We need to pass certain data to create a survey. The following is the current example data structure for survey creation
 ``` 
const survey = {
    title: '',
    description: '',
    questions: [
         {      
               id: 'question_1',
               type: 'multiple_choice',
               active: true,
               details: { // any necessary data for the kind of question type
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]        
          },
          {      
               id: 'question_2',
               type: 'checkboxes',
               active: false, // there should be one active question, this will be use which question is currently being edited
               details: {
                    options: [
                        'Option 1',
                        'Option 2',
                        'Option 3'
                    ]        
          }         
    ],
};

const question_types = {
    multiple_choice: 'Multiple Choice',
    checkboxes: 'Checkboxes'
};

 ```

