<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercicio extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'pch_id',
    ];

    public function pch()
    {
        return $this->belongsTo(Pch::class, 'pch_id');
    }
}
