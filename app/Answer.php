<?php

namespace App;

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
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
