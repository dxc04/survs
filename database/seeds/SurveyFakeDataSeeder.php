<?php

use App\Models\Answer;
use App\Models\Choice;
use App\Models\Question;
use App\Models\Respondent;
use App\Models\Response;
use App\Models\Roster;
use App\Models\Survey;
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

        $choices = factory(Choice::class, 4)->make([
            'order' => function() {static $order = 0; return $order++;},
            'label' => function() {static $label = 'A'; return $label++;},
        ]);
        $choices->each(function(Choice $choice) use ($question) {
            $question->choices()->associate($choice);
        });

        $survey->questions()->save($question);


        /** @var \App\Models\Roster $roster */
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
