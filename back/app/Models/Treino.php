<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treino extends Model
{
    use HasFactory;

    protected $fillable = ['dia_semana', 'pch_id'];

    public const SEGUNDA = 1;
    public const TERCA = 2;
    public const QUARTA = 3;
    public const QUINTA = 4;
    public const SEXTA = 5;
    public const SABADO = 6;
    public const DOMINGO = 7;

    public static function diasSemana(): array
    {
        return [
            self::SEGUNDA => 'Segunda-feira',
            self::TERCA => 'Terça-feira',
            self::QUARTA => 'Quarta-feira',
            self::QUINTA => 'Quinta-feira',
            self::SEXTA => 'Sexta-feira',
            self::SABADO => 'Sábado',
            self::DOMINGO => 'Domingo',
        ];
    }

    public function exercicios()
    {
        return $this->belongsToMany(Exercicio::class, 'exercicio_treino')
            ->withPivot('series', 'repeticoes', 'carga')
            ->withTimestamps();
    }

    public function pch()
    {
        return $this->belongsTo(Pch::class);
    }
}
