<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Choice::class, function(Faker\Generator $faker) {
    static $order = 0;
    static $label = 'A';
    return [
        'choice' => $faker->word,
        'label'  => $label++,
        'order' => $order++
    ];
});

$factory->define(App\Question::class, function(Faker\Generator $faker) {
    static $order = 0;
    return [
        'stem'  => $faker->sentence,
        'order' => $order++
    ];
});

$factory->define(App\Survey::class, function(Faker\Generator $faker) {
    $now = \Carbon\Carbon::now();
    return [
        'title'     => title_case($faker->words(3, true)),
        'published' => false,
    ];
});

$factory->define(App\Answer::class, function(Faker\Generator $faker) {
    return [
        'answer' => $faker->word
    ];
});

$factory->define(App\Response::class, function(Faker\Generator $faker) {
    return [];
});

$factory->define(App\Respondent::class, function(Faker\Generator $faker) {
    return [];
});

$factory->define(App\Roster::class, function(Faker\Generator $faker) {
    return [
        'start_date_time' => $faker->dateTimeThisMonth,
        'end_date_time'   => $faker->dateTimeThisMonth,
        'delivery'        => 'online',
        'respondent_type' => 'anonymous'
    ];
});
