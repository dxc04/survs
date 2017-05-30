<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Javascript;

class SurveyController extends Controller
{
    public function create()
    {
        $survey = [
            'id' => 'new',
            'title' => 'Untitled Survey',
            'description' => '',
            'questions' => [
                [
                    'id' => 'question_1',
                    'type' => 'multiple_choice',
                    'active' => true,
                    'question' => 'What is your favorite pet?',
                    'details' => [
                        'options' => [
                            'Dog',
                            'Cat',
                            'Turtle'
                        ],
                    ],
                ],
            ],
        ];

        $question_types = [
            'multiple_choice' => 'Multiple Choice',
            'checkboxes' => 'Checkboxes',
            'true_or_false' => 'True or False',
            'short_answer' => 'Short Answer',
            'paragraph' => 'Paragraph',
	    'scale' => 'Scale'
        ];

        JavaScript::put([
            'survey' => $survey,
            'question_types' => $question_types
        ]);

        return view('survey.create');
    }

    public function publish($survey_id)
    {
        $survey = [
            'id' => 'id',
            'title' => 'Untitled Survey',
            'description' => 'This is a survey.',
            'questions' => [
                [
                    'id' => 'question_1',
                    'type' => 'multiple_choice',
                    'active' => true,
                    'question' => 'What is your favorite pet?',
                    'details' => [
                        'options' => [
                            'Option 1',
                            'Option 2',
                            'Option 3'
                        ],
                    ],
                ],
            ],
        ];

        JavaScript::put([
            'survey' => $survey,
        ]);

        return view('survey.publish');
    }

    public function save(Request $request)
    {
        // @todo add saving process here
        return response()->json($request->all());
    }   
}
