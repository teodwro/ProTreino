<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthentication extends Middleware
{
    /**
     * Handle an unauthenticated user.
     */
    protected function unauthenticated($request, array $guards): void
    {
        // Para API, retornamos erro JSON em vez de redirecionar
        abort(response()->json([
            'status' => 'error',
            'message' => 'Unauthenticated',
            'code' => 'UNAUTHENTICATED',
            'redirect' => '/login'
        ], Response::HTTP_UNAUTHORIZED));
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Para API, não redirecionamos, apenas retornamos erro
        return null;
    }
}
