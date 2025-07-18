<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExercicioController;
use App\Http\Controllers\PchController;
use App\Http\Controllers\TreinoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::resource('exercicios', ExercicioController::class);
Route::resource('pch', PchController::class);

Route::resource('treinos', TreinoController::class);