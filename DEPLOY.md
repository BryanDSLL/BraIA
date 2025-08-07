# Deploy no Vercel - Bra.IA

## Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Chave da API do [OpenRouter](https://openrouter.ai)

## Passos para Deploy

### 1. Preparar o Repositório

```bash
# Instalar dependências atualizadas
npm install

# Testar localmente
npm run dev
```

### 2. Configurar Variáveis de Ambiente

No painel do Vercel, adicione a seguinte variável:

- `OPENROUTER_API_KEY`: Sua chave da API do OpenRouter

### 3. Deploy

#### Opção 1: Via GitHub
1. Faça push do código para um repositório GitHub
2. Conecte o repositório no Vercel
3. O deploy será automático

#### Opção 2: Via Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

## Mudanças Implementadas

✅ **Migração para API Routes**: Substituído servidor Express por `/api/chat`
✅ **URLs Relativas**: Removido IP hardcoded
✅ **Dependências Limpas**: Removidas dependências desnecessárias
✅ **Configuração Vercel**: Adicionado `vercel.json`
✅ **Next.js Otimizado**: Configurações para produção

## Limitações Atuais

⚠️ **Contexto em Memória**: As conversas são perdidas entre deployments

### Solução Recomendada (Futuro)
Implementar persistência com:
- **Vercel KV** (Redis)
- **PlanetScale** (MySQL)
- **MongoDB Atlas**
- **Supabase** (PostgreSQL)

## Estrutura Final

```
src/
└── app/
    ├── api/
    │   └── chat/
    │       └── route.js    # API serverless
    ├── page.js             # Frontend React
    └── layout.js
```

## Teste Local

```bash
# Criar arquivo .env.local
echo "OPENROUTER_API_KEY=sua_chave_aqui" > .env.local

# Executar
npm run dev
```

O projeto agora está **100% compatível** com Vercel Serverless! 🚀