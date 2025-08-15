# ProTreino - Aplicativo de Academia

Um aplicativo completo para gerenciamento de treinos e exercícios de academia, desenvolvido com Laravel 12 (backend) e React Native (frontend).

## 🚀 Funcionalidades

### ✅ Implementadas
- **Sistema de Autenticação Completo**
  - Login/Logout
  - Registro de usuários
  - Proteção de rotas
  - Tokens JWT com Laravel Sanctum

- **Página de Perfil Profissional**
  - Exibição dos dados reais do usuário logado
  - Edição de informações pessoais
  - Upload de foto de perfil
  - Estatísticas básicas
  - Interface moderna e responsiva

- **Gerenciamento de Exercícios**
  - Listagem de exercícios
  - Filtros por grupo muscular
  - Adição de novos exercícios

- **Gerenciamento de Treinos**
  - Criação de treinos personalizados
  - Organização por dia da semana
  - Associação de exercícios com séries e repetições

- **Interface Moderna**
  - Design dark mode profissional
  - Gradientes e sombras
  - Ícones intuitivos
  - Navegação por tabs

### 🔄 Em Desenvolvimento
- Sincronização de dados offline
- Notificações de treino
- Histórico de progresso
- Relatórios e estatísticas avançadas

## 🛠️ Tecnologias Utilizadas

### Backend (Laravel 12)
- PHP 8.2+
- Laravel 12
- Laravel Sanctum para autenticação
- MySQL/PostgreSQL
- API RESTful

### Frontend (React Native)
- React Native 0.79+
- Expo SDK 53
- TypeScript
- React Navigation
- AsyncStorage para persistência local

## 📱 Estrutura do Projeto

```
ProTreino/
├── back/                 # Backend Laravel
│   ├── app/
│   │   ├── Http/Controllers/
│   │   ├── Models/
│   │   └── Providers/
│   ├── database/
│   ├── routes/
│   └── ...
├── front/                # Frontend React Native
│   ├── app/
│   │   ├── (tabs)/      # Telas principais
│   │   ├── contexts/    # Contextos React
│   │   └── components/  # Componentes reutilizáveis
│   ├── assets/
│   └── ...
└── README.md
```

## 🚀 Como Executar

### Backend (Laravel)

1. **Instalar dependências:**
   ```bash
   cd back
   composer install
   ```

2. **Configurar banco de dados:**
   - Copie `.env.example` para `.env`
   - Configure as variáveis de banco de dados

3. **Executar migrações:**
   ```bash
   php artisan migrate
   ```

4. **Iniciar servidor:**
   ```bash
   php artisan serve
   ```

### Frontend (React Native)

1. **Instalar dependências:**
   ```bash
   cd front
   npm install
   ```

2. **Instalar Expo CLI (global):**
   ```bash
   npm install -g @expo/cli
   ```

3. **Iniciar aplicativo:**
   ```bash
   npm start
   ```

4. **Executar no dispositivo/emulador:**
   - Pressione `a` para Android
   - Pressione `i` para iOS
   - Escaneie QR code com Expo Go

## 🔐 Sistema de Autenticação

O aplicativo implementa um sistema de autenticação robusto:

- **Login:** Validação de credenciais via API
- **Tokens:** JWT tokens com Laravel Sanctum
- **Proteção:** Rotas protegidas que redirecionam para login
- **Persistência:** Dados de usuário salvos localmente
- **Logout:** Limpeza de tokens e redirecionamento

## 📱 Telas Principais

### 1. Login
- Interface limpa e moderna
- Validação de campos
- Feedback visual de carregamento
- Redirecionamento automático após login

### 2. Perfil
- Dados reais do usuário logado
- Edição inline de informações
- Upload de foto de perfil
- Estatísticas básicas
- Botões de ação rápida

### 3. Exercícios
- Listagem com filtros
- Navegação para detalhes
- Adição de novos exercícios

### 4. Treinos
- Organização por dia da semana
- Edição de treinos existentes
- Criação de novos treinos

## 🔧 Configurações Importantes

### Backend
- **CORS:** Configurado para permitir requisições do frontend
- **Sanctum:** Middleware de autenticação configurado
- **API Routes:** Todas as rotas protegidas por autenticação

### Frontend
- **URL da API:** Configurada para `http://127.0.0.1:8000/api`
- **AsyncStorage:** Para persistência de dados de autenticação
- **Context API:** Gerenciamento global de estado de autenticação

## 🐛 Solução de Problemas

### Erro de Conexão com API
- Verifique se o servidor Laravel está rodando
- Confirme a URL da API no frontend
- Verifique as configurações de CORS

### Problemas de Autenticação
- Limpe o AsyncStorage do aplicativo
- Verifique se o token não expirou
- Confirme as configurações do Sanctum

### Erros de Build
- Limpe o cache: `npm start -- --clear`
- Reinstale dependências: `rm -rf node_modules && npm install`

## 📈 Próximos Passos

1. **Implementar sincronização offline**
2. **Adicionar notificações push**
3. **Criar sistema de relatórios**
4. **Implementar backup na nuvem**
5. **Adicionar testes automatizados**

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato com a equipe de desenvolvimento

---

**ProTreino** - Transformando sua experiência na academia! 💪
