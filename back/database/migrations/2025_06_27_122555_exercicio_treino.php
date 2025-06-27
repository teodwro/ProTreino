<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('exercicio_treino', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('exercicio_id');
            $table->unsignedBigInteger('treino_id');
            $table->string('series');
            $table->string('repeticoes');
            $table->string('carga')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercicio_treino');
    }
};
