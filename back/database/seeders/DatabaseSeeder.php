<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'francisquini',
            'email' => 'francisco@gmail.com',
            'password' => Hash::make('123123')
        ]);

        User::factory()->create([
            'name' => 'tidiri',
            'email' => 'teodoro@gmail.com',
            'password' => Hash::make('123123')
        ]);

        User::factory()->create([
            'name' => 'daniíli',
            'email' => 'daniele@gmail.com',
            'password' => Hash::make('123123')
        ]);

        User::factory()->create([
            'name' => 'devilli',
            'email' => 'devilla@gmail.com',
            'password' => Hash::make('123123')
        ]);

        $this->call(PchSeeder::class);
        $this->call(ExercicioSeeder::class);
    }
}
