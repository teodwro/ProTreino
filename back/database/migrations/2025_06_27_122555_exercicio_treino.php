<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('exercicio_treino', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('exercicio_id');
            $table->unsignedBigInteger('treino_id');
            $table->integer('series');
            $table->integer('repeticoes');
            $table->integer('carga')->nullable(); // Coluna adicionada aqui
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('exercicio_treino');
    }
};
