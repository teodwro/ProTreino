<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pch;
use App\Models\Exercicio;

class ExercicioSeeder extends Seeder
{

    public function run(): void
    {
        $exerciciosPorPch = [
            'Pernas' => [
                'Agachamento Livre',
                'Leg Press',
                'Cadeira Extensora',
                'Cadeira Flexora',
                'Stiff',
                'Avanço',
            ],
            'Costas' => [
                'Puxada Frente',
                'Remada Curvada',
                'Remada Unilateral',
                'Levantamento Terra',
                'Pulldown',
            ],
            'Abdômen' => [
                'Abdominal Supra',
                'Prancha',
                'Abdominal Infra',
                'Abdominal Oblíquo',
            ],
            'Braço' => [
                'Rosca Direta',
                'Rosca Martelo',
                'Tríceps Testa',
                'Tríceps Pulley',
            ],
            'Peito' => [
                'Supino Reto',
                'Supino Inclinado',
                'Crucifixo',
                'Peck Deck',
                'Flexão de Braço',
            ],
            'Ombros' => [
                'Desenvolvimento',
                'Elevação Lateral',
                'Elevação Frontal',
                'Remada Alta',
            ],
            'Glúteos' => [
                'Glúteo no Cabo',
                'Abdução de Quadril',
                'Agachamento Sumô',
            ],
            'Panturrilhas' => [
                'Elevação de Panturrilha em Pé',
                'Elevação de Panturrilha Sentado',
            ],
        ];

        foreach ($exerciciosPorPch as $pchNome => $exercicios) {
            $pch = Pch::where('nome', $pchNome)->first();
            if ($pch) {
                foreach ($exercicios as $exercicioNome) {
                    Exercicio::create([
                        'nome' => $exercicioNome,
                        'pch_id' => $pch->id,
                    ]);
                }
            }
        }
    }
}