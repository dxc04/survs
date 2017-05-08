<?php

namespace App\Models;

/**
 * Class Answer
 *
 * @package App
 * @property string $question_id
 * @property string $answer
 * @property-read Response $response
 * @property-read Question $question
 */
class Answer extends AbstractModel
{
    protected $fillable = ['answer'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
