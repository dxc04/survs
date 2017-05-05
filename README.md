# surveys
DnA Surveys

### Additional Application Requirements
 * Database: MongoDB 3.4
 * PHP Extensions: `php-mongodb`

### Conventions
 * Collection name is in plural form, e.g. `users`
 * Collection's primary key is `id`
 * Reference column's name is the singular form of the collection followed by `_id`, e.g. `user_id`
 * Model class name is the singular form of the collection. e.g. `User`
 * Models extend `App\AbstractModel`
 
 
 ### Tools
 * See `php artisan make:model --help` for creating models
 * Run `php artisan db:seed --class=SurveyFakeDataSeeder` to generate sample survey, question, roster and responses.
