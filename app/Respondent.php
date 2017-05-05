<?php

namespace App;

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
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function responses()
    {
        return $this->hasMany(Response::class);
    }
}
