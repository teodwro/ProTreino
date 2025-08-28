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

        // Procura treino existente para o mesmo dia e pch
        $treino = Treino::where('dia_semana', $request->dia_semana)->first();

        if ($treino) {
            // Atualiza os exercícios (remove todos e adiciona os novos)
            $treino->exercicios()->detach();
            foreach ($request->exercicios as $item) {
                $treino->exercicios()->attach($item['exercicio_id'], [
                    'series' => $item['series'],
                    'repeticoes' => $item['repeticoes'],
                    'carga' => $item['carga'] ?? null,
                ]);
            }
            $treino->refresh();
            return response()->json([
                'message' => 'Treino atualizado com sucesso (dia já existia).',
                'data' => $treino->load(['pch', 'exercicios']),
            ]);
        } else {
            // Cria novo treino normalmente
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

    public function show($id)
    {
        $treino = Treino::with(['pch', 'exercicios'])->findOrFail($id);
        return response()->json([
            'data' => $treino
        ]);
    }
}
