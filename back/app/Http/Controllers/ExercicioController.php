<?php

namespace App\Http\Controllers;

use App\Models\Exercicio;
use App\Models\Pch;
use Illuminate\Http\Request;

class ExercicioController extends Controller
{
    public function index()
    {
        try {
            $exercicios = Exercicio::with('pch')->orderBy('created_at', 'desc')->get();
            return response()->json([
                'message' => 'Lista de exercícios carregada com sucesso.',
                'data' => $exercicios
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao carregar os exercícios.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nome' => 'required|string',
                'pch_id' => 'required|integer|exists:pch,id',
            ]);

            $exercicio = Exercicio::create($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Exercício salvo com sucesso.',
                'data' => $exercicio
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao salvar o treino.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
{
    try {
        $exercicio = Exercicio::with('pch')->find($id);

        if (!$exercicio) {
            return response()->json([
                'error' => 'Exercício não encontrado.'
            ], 404);
        }

        return response()->json([
            'message' => 'Exercício encontrado com sucesso.',
            'data' => $exercicio
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erro ao buscar o exercício.',
            'details' => $e->getMessage()
        ], 500);
    }
}



public function update(Request $request, Exercicio $exercicio)
{
    try {
        $request->validate([
            'nome' => 'sometimes|required|string',
            'pch_id' => 'sometimes|required|exists:pch,id'
        ]);

        $exercicio->update($request->only(['nome', 'pch_id']));

        return response()->json([
            'message' => 'Exercício atualizado com sucesso.',
            'data' => $exercicio
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erro ao atualizar o exercício.',
            'details' => $e->getMessage()
        ], 500);
    }
}


    public function destroy(Exercicio $exercicio)
    {
        try {
            $exercicio->delete();

            return response()->json([
                'message' => 'Exercício deletado com sucesso.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao deletar o exercício.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
