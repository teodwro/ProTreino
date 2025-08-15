<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Rota de teste para verificar se a API está funcionando
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'ProTreino API está funcionando!',
        'version' => '1.0.0',
        'timestamp' => now()
    ]);
});
