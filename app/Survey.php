<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

/**
 * Class Survey
 *
 * @package App
 * @property string $id
 * @property string $title
 * @property string $description
 * @property string $user_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property bool $published
 * @property-read Collection $questions
 * @property-read User $user
 * @property-read Collection $rosters
 */
class Survey extends AbstractModel
{
    Use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['title', 'published', 'description'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rosters()
    {
        return $this->hasMany(Roster::class);
    }
}
