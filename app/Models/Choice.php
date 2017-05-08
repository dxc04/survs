<?php

namespace App\Models;

/**
 * Class Choice
 *
 * @package App
 * @property string $choice
 * @property string $label
 * @property int $order
 * @property-read Question
 */
class Choice extends AbstractModel
{
    public $timestamps = false;

    protected $fillable = ['choice', 'label', 'order'];
}
