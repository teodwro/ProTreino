<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('treinos', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('dia_semana'); // 1 a 7
            $table->foreignId('pch_id')->constrained('pch');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treino');
    }
};
