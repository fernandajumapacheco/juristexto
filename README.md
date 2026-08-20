# JurisTexto

Assistente de redação e português jurídico. Site estático (`index.html`) com correção local instantânea e três modos de revisão por IA (via função serverless que chama a API gratuita do Google Gemini).

## Rodando localmente (sem IA)

Basta abrir `index.html` no navegador. A correção de português (botão "Ver original"/"Ver revisado") funciona sem servidor. Os 3 modos de revisão por IA precisam do backend publicado (abaixo).

## Publicar com integração de IA (Vercel + Gemini gratuito)

1. **Criar a chave de API do Google Gemini (gratuita, sem cartão)**
   - Acesse https://aistudio.google.com/apikey e entre com sua conta Google.
   - Clique em **Create API key** e copie a chave gerada.
   - A camada gratuita tem um limite diário de requisições (renovado todo dia) — suficiente para uso pessoal/escritório pequeno. Se precisar de mais volume no futuro, dá para ativar billing depois.

2. **Criar conta na Vercel e publicar**
   - Acesse https://vercel.com/ e crie uma conta (pode entrar com GitHub).
   - Suba este projeto para um repositório no GitHub (veja abaixo).
   - Na Vercel, clique em **Add New → Project**, selecione o repositório `juristexto`.
   - Antes de publicar (ou depois, em **Settings → Environment Variables**), adicione:
     - Nome: `GEMINI_API_KEY`
     - Valor: a chave copiada no passo 1
   - Clique em **Deploy**. Em poucos minutos você recebe uma URL pública (ex.: `juristexto.vercel.app`) já com os botões de IA funcionando.

3. **Testar**
   - Abra a URL publicada, escreva um texto, escolha um dos 3 modos e clique em "Revisar texto".

## Subir para o GitHub

```bash
git init   # se ainda não for um repositório git
git add .
git commit -m "JurisTexto: painel com 3 modos e integração de IA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/juristexto.git
git push -u origin main
```

Depois é só conectar esse repositório na Vercel (passo 2 acima). Toda vez que você der `git push`, a Vercel publica a nova versão automaticamente.

## Estrutura

- `index.html` — front-end completo (interface, correção local, cards de português/conectivos/palavras do dia).
- `api/review.js` — função serverless que recebe `{ text, mode }` e chama a API do Gemini com a chave guardada em `GEMINI_API_KEY`.
- `vercel.json` — configuração da função serverless.

## Segurança

A chave de API nunca fica no navegador nem no código-fonte — só existe como variável de ambiente no servidor da Vercel. Não compartilhe a chave em conversas, prints ou commits.
