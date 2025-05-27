<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(["status" => "error", "message" => $validate->errors()->getMessages()], 200);
        }

        $validated = $validate->validated();

        $user = new User();
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->password = Hash::make($validated['password']);

        if ($user->save()) {
            return response()->json([
                "status" => "success",
                "message" => "Usuário criado com sucesso"
            ], 201);
        }
        return response()->json(["status" => "error", "message" => "Erro desconhecido"], 200);
    }
}
