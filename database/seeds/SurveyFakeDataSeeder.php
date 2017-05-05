<?php

use App\Answer;
use App\Choice;
use App\Question;
use App\Respondent;
use App\Response;
use App\Roster;
use App\Survey;
use Illuminate\Database\Seeder;

class SurveyFakeDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $survey = factory(Survey::class)->create();

        /** @var Question $question */
        $question = factory(Question::class)->make();
        $choices = factory(Choice::class, 4)->make();
        $choices->each(function(Choice $choice) use ($question) {
            $question->choices()->associate($choice);
        });

        $survey->questions()->save($question);


        /** @var Roster $roster */
        $roster = factory(Roster::class)->make();
        /** @var Respondent $respondent */
        $respondent = factory(Respondent::class)->make();
        $roster->respondents()->associate($respondent);
        $survey->rosters()->save($roster);


        factory(Response::class, 2)->make()->each(function (Response $response) use ($respondent, $question) {
            /** @var Answer $answer */
            $random_choice = $question->choices->random();
            $answer = factory(Answer::class)->make(['answer' => $random_choice->choice]);
            $answer->question()->associate($question);
            $response->answers()->associate($answer);

            $respondent->responses()->save($response);
        });
    }
}
