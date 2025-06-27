<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pch extends Model
{
    use HasFactory;

    protected $table = 'pch';

    protected $fillable = [
        'nome'
    ];
}
