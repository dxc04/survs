<?php

namespace App;
use Carbon\Carbon;
use Illuminate\Support\Collection;

/**
 * Class Response
 *
 * @package App
 * @property string $respondent_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property-read Collection $answers
 * @property-read Respondent $respondent
 */
class Response extends AbstractModel
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function respondent()
    {
        return $this->belongsTo(Respondent::class);
    }

    /**
     * @return \Jenssegers\Mongodb\Relations\EmbedsMany
     */
    public function answers()
    {
        return $this->embedsMany(Answer::class);
    }
}
