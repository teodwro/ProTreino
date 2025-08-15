<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>ProTreino - API Backend</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div class="max-w-4xl mx-auto text-center px-6">
            <!-- Logo -->
            <div class="mb-8">
                <div class="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span class="text-3xl font-bold text-white">PT</span>
                </div>
                <h1 class="text-4xl font-bold text-blue-400 mb-2">ProTreino</h1>
                <p class="text-xl text-gray-300">Backend API</p>
            </div>

            <!-- Status -->
            <div class="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-semibold mb-4">Status da API</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-green-600 rounded-lg p-4">
                        <div class="text-2xl font-bold">✅</div>
                        <div class="text-sm">Laravel 12</div>
                        <div class="text-xs text-gray-300">Funcionando</div>
                    </div>
                    <div class="bg-blue-600 rounded-lg p-4">
                        <div class="text-2xl font-bold">🔐</div>
                        <div class="text-sm">Sanctum</div>
                        <div class="text-xs text-gray-300">Ativo</div>
                    </div>
                    <div class="bg-purple-600 rounded-lg p-4">
                        <div class="text-2xl font-bold">📱</div>
                        <div class="text-sm">React Native</div>
                        <div class="text-xs text-gray-300">Frontend</div>
                    </div>
                </div>
            </div>

            <!-- Endpoints -->
            <div class="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 class="text-2xl font-semibold mb-4">Endpoints Disponíveis</h2>
                <div class="text-left space-y-2">
                    <div class="flex items-center space-x-4 p-3 bg-gray-700 rounded">
                        <span class="bg-green-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                        <span class="text-blue-400 font-mono">/api/login</span>
                        <span class="text-gray-400">Autenticação de usuário</span>
                    </div>
                    <div class="flex items-center space-x-4 p-3 bg-gray-700 rounded">
                        <span class="bg-blue-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                        <span class="text-blue-400 font-mono">/api/register</span>
                        <span class="text-gray-400">Registro de usuário</span>
                    </div>
                    <div class="flex items-center space-x-4 p-3 bg-gray-700 rounded">
                        <span class="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-mono">GET</span>
                        <span class="text-blue-400 font-mono">/api/profile</span>
                        <span class="text-gray-400">Perfil do usuário (autenticado)</span>
                    </div>
                    <div class="flex items-center space-x-4 p-3 bg-gray-700 rounded">
                        <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-mono">POST</span>
                        <span class="text-blue-400 font-mono">/api/logout</span>
                        <span class="text-gray-400">Logout do usuário</span>
                    </div>
                </div>
            </div>

            <!-- Informações -->
            <div class="bg-gray-800 rounded-lg p-6">
                <h2 class="text-2xl font-semibold mb-4">Informações do Projeto</h2>
                <div class="text-left space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-400">Versão do Laravel:</span>
                        <span class="text-white">{{ app()->version() }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">Ambiente:</span>
                        <span class="text-white">{{ app()->environment() }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">URL Base:</span>
                        <span class="text-white">{{ url('/') }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-400">API Base:</span>
                        <span class="text-white">{{ url('/api') }}</span>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 text-gray-400 text-sm">
                <p>ProTreino - Transformando sua experiência na academia! 💪</p>
                <p class="mt-2">Desenvolvido com Laravel 12 + React Native</p>
            </div>
        </div>
    </body>
</html>
