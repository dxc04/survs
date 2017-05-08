<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

/**
 * Class Roster
 *
 * @package App
 * @property string $id
 * @property string $survey_id
 * @property string $user_id
 * @property string $start_date_time
 * @property string $end_date_time
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property string $respondent_type
 * @property string $delivery
 * @property-read Collection $respondents
 * @property-read Survey $survey
 * @property-read User $user
 */
class Roster extends AbstractModel
{
    use SoftDeletes;

    protected $dates = ['deleted_at', 'start_date_time', 'end_date_time'];

    protected $fillable = ['start_date_time', 'end_date_time', 'respondent_type', 'delivery'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

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
    public function respondents()
    {
        return $this->embedsMany(Respondent::class);
    }
}
