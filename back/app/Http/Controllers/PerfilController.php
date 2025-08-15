<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PerfilController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'id' => 7,
            'nome' => 'Francisco   ',
            'email' => 'fr',
            'foto' =>  null,
        ]);
    }
    
}
