<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pch;

class PchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $partes = [
            'Pernas',
            'Costas',
            'Abdômen',
            'Braço',
            'Peito',
            'Ombros',
            'Glúteos',
            'Panturrilhas',
        ];

        foreach ($partes as $parte) {
            Pch::create(['nome' => $parte]);
        }
    }
}
