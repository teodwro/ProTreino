<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExercicioController;
use App\Http\Controllers\PchController;
use App\Http\Controllers\TreinoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rotas protegidas (requerem autenticação Sanctum via Bearer Token)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::resource('exercicios', ExercicioController::class);
    Route::resource('pch', PchController::class);
    Route::resource('treinos', TreinoController::class);
    Route::get('/treinos/dia/{dia}', [TreinoController::class, 'byDay']);
});

// Rota para testar autenticação
Route::get('/user', function (Request $request) {
    return response()->json([
        'status' => 'success',
        'data' => [
            'user' => $request->user(),
            'authenticated' => auth()->check()
        ]
    ]);
})->middleware('auth:sanctum');

// Rota de teste para verificar se a API está funcionando
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'ProTreino API está funcionando!',
        'version' => '1.0.0',
        'timestamp' => now()
    ]);
});
