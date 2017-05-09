<?php

namespace App\Models;

use Illuminate\Support\Collection;

/**
 * Class Respondent
 *
 * @package App
 * @property string $id
 * @property int remote_id
 * @property-read Roster $roster
 * @property-read Collection $responses
 */
class Respondent extends AbstractModel
{
    protected $fillable = ['remote_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
