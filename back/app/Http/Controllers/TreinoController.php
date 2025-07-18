<?php

namespace App\Http\Controllers;

use App\Models\Treino;
use Illuminate\Http\Request;

class TreinoController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Lista de treinos carregada com sucesso.',
            'data' => Treino::with(['pch', 'exercicios'])->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'dia_semana' => 'required|integer|between:1,7',
            'pch_id' => 'required|exists:pch,id',
            'exercicios' => 'required|array|min:1',
            'exercicios.*.exercicio_id' => 'required|exists:exercicios,id',
            'exercicios.*.series' => 'required|string',
            'exercicios.*.repeticoes' => 'required|string',
            'exercicios.*.carga' => 'nullable|string',
        ]);

        $treino = Treino::create([
            'dia_semana' => $request->dia_semana,
            'pch_id' => $request->pch_id,
        ]);

        foreach ($request->exercicios as $item) {
            $treino->exercicios()->attach($item['exercicio_id'], [
                'series' => $item['series'],
                'repeticoes' => $item['repeticoes'],
                'carga' => $item['carga'] ?? null,
            ]);
        }

        return response()->json([
            'message' => 'Treino criado com sucesso.',
            'data' => $treino->load(['pch', 'exercicios']),
        ]);
    }

    public function update(Request $request, Treino $treino)
    {
        $request->validate([
            'dia_semana' => 'required|integer|between:1,7',
            'pch_id' => 'required|exists:pch,id',
        ]);

        $treino->update([
            'dia_semana' => $request->dia_semana,
            'pch_id' => $request->pch_id,
        ]);

        return response()->json([
            'message' => 'Treino atualizado com sucesso.',
            'data' => $treino
        ]);
    }

    public function destroy(Treino $treino)
    {
        $treino->exercicios()->detach(); // Limpa a pivot table
        $treino->delete();

        return response()->json([
            'message' => 'Treino deletado com sucesso.'
        ]);
    }
}
