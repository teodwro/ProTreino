<?php

namespace App\Http\Controllers;

use App\Models\Pch;
use Illuminate\Http\Request;

class PchController extends Controller
{
    public function index()
    {
        try {
            $partes = Pch::all();
            return response()->json([
                'message' => 'Lista de partes do corpo carregada com sucesso.',
                'data' => $partes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao carregar as partes do corpo.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
{
    try {
        $request->validate([
            'nome' => 'required|string|unique:pch,nome',
        ]);

        $pch = Pch::create([
            'nome' => $request->nome,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Grupo muscular adicionado com sucesso!',
            'data' => $pch
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Erro ao adicionar grupo muscular.',
            'details' => $e->getMessage()
        ], 500);
    }
}

}
