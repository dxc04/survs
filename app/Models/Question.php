<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Collection;

/**
 * Class Question
 *
 * @package App
 * @property string $id
 * @property string $stem
 * @property Collection $choices
 * @property int $order
 * @property string $survey_id
 * @property string $question_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Survey $survey
 */
class Question extends AbstractModel
{
    protected $fillable = ['stem', 'order', 'question_type'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * @return \Jenssegers\Mongodb\Relations\EmbedsMany
     */
    public function choices()
    {
        return $this->embedsMany(Choice::class);
    }
}
