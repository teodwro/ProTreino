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
            'data' => Treino::all()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'dia_semana' => 'required|string',
        ]);

        $treino = Treino::create($request->all());

        return response()->json([
            'message' => 'Treino criado com sucesso.',
            'data' => $treino
        ]);
    }

    public function update(Request $request, Treino $treino)
    {
        $request->validate([
            'dia_semana' => 'required|string',
        ]);

        $treino->update($request->all());

        return response()->json([
            'message' => 'Treino atualizado com sucesso.',
            'data' => $treino
        ]);
    }

    public function destroy(Treino $treino)
    {
        $treino->delete();

        return response()->json([
            'message' => 'Treino deletado com sucesso.'
        ]);
    }
}
