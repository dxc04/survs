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
            'is_required' => false,
            'active_question' => 'question_1',
            'settings' => [
                'questions_per_page' => 5,
            ],
            'questions' => [
                [
                    'id' => 'question_1',
                    'type' => 'multiple_choice',
                    'order' => 0,
                    'question' => 'What is your favorite pet?',
                    'is_required' => false,
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
            'scale' => 'Scale',
            'grid' => 'Grid'
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
            'settings' => [
                'questions_per_page' => 5,
            ],
            'questions' => [
                [
                    'id' => 'question_1',
                    'type' => 'multiple_choice',
                    'question' => 'What is your favorite pet?',
                    'is_required' => false,
                    'order' => 0,
                    'details' => [
                        'options' => [
                            'Option 1',
                            'Option 2',
                            'Option 3'
                        ],
                    ],
                ],
                [
                    'id' => 'question_2',
                    'type' => 'multiple_choice',
                    'question' => 'What is your favorite pet?',
                    'is_required' => true,
                    'order' => 1,
                    'details' => [
                        'options' => [
                            'Option 1',
                            'Option 2',
                            'Option 3'
                        ],
                    ],
                ],
                [
                    'id' => 'question_3',
                    'type' => 'checkboxes',
                    'question' => 'What is your favorite pet?',
                    'is_required' => false,
                    'order' => 2,
                    'details' => [
                        'options' => [
                            'Option 1',
                            'Option 2',
                            'Option 3'
                        ],
                    ],
                ],
                [
                    'id' => 'question_4',
                    'type' => 'true_or_false',
                    'question' => 'What is your favorite pet?',
                    'is_required' => true,
                    'order' => 3,
                    'details' => [
                        'options' => [
                            'Yes',
                            'No'
                        ],
                    ],
                ],
                [
                    'id' => 'question_5',
                    'type' => 'short_answer',
                    'question' => 'What is the name of your pet',
                    'is_required' => false,
                    'order' => 4,
                    'details' => [],
                ],
                [
                    'id' => 'question_6',
                    'type' => 'paragraph',
                    'question' => 'What is the name of your pet',
                    'is_required' => true,
                    'order' => 5,
                    'details' => [],
                ],
                [
                    'id' => 'question_7',
                    'type' => 'scale',
                    'question' => 'Test Scale Question Type',
                    'is_required' => true,
                    'order' => 6,
                    'details' => [
                        'range' => [
                            'min' => ['value' => 1, 'label' => 'min'],
                            'max' => ['value' => 5, 'label' => 'max']
                        ]                        
                    ],
                ],
                [
                    'id' => 'question_8',
                    'type' => 'grid',
                    'question' => 'Test Grid Question Type',
                    'is_required' => false,
                    'order' => 7,
                    'details' => [
                        'columns' => [
                            'Column 1',
                            'Column 2',
                            'Column 3',
                        ],
                        'rows' => [
                            'Row 1',
                            'Row 2',
                            'Row 3',
                        ]                        

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
