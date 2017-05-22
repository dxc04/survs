<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Javascript;

class SurveyController extends Controller
{
    public function create()
    {
        $survey = [
            'title' => 'Untitled Survey',
            'description' => '',
            'questions' => [
                [
                    'id' => 'question_1',
                    'type' => 'multiple_choice',
                    'active' => true,
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

        $question_types = [
            'multiple_choice' => 'Multiple Choice',
            'checkboxes' => 'Checkboxes',
        ];

        JavaScript::put([
            'survey' => $survey,
            'question_types' => $question_types
        ]);

        return view('survey.create');
    }

    public function edit()
    {
    
    }
    
    public function save(Request $request)
    {
        // @todo add saving process here
        return response()->json($request->all());
    }   
}
