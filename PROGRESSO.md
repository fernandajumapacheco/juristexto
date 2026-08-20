# JurisTexto — Resumo do que já foi feito

_Última atualização: 19/08/2026_

## O que é

Site de apoio à redação jurídica: revisão de português local (grátis, instantânea) + 3 modos de revisão por Inteligência Artificial (Google Gemini).

**Site publicado:** https://juristexto.vercel.app/
**Código-fonte:** https://github.com/fernandajumapacheco/juristexto

## Como o projeto funciona (visão geral)

- `index.html` — a página inteira (visual + interação). Continua se chamando `index.html` por exigência técnica dos servidores web, mesmo o app se chamando "JurisTexto".
- `api/review.js` — um "servidor" pequeno que roda na Vercel, recebe o texto do site e pergunta pra IA do Google (Gemini) como revisar.
- A chave secreta da API (`GEMINI_API_KEY`) fica guardada só dentro do painel da Vercel — nunca aparece no código nem no GitHub.

## Linha do tempo do que fizemos

1. **Painel original tinha 5 modos de revisão, e os botões de IA não funcionavam** (davam erro "requer integração com backend").
2. **Reduzimos para 3 modos**: Tornar mais objetivo, Melhorar redação, Revisão completa.
3. **Conectamos os botões a uma IA de verdade** (Google Gemini, gratuito) através de uma função serverless na Vercel.
4. **Corrigimos bugs**: um botão sem estilo (Banco de conectivos), nome de modelo do Gemini desatualizado, mensagens de erro que agora mostram a causa real.
5. **Nova identidade visual**: paleta lilás/azul mais suave, ícone novo (🖋️✨ caneta + brilho) no lugar da balança.
6. **Cards "3 Minutos de Português Jurídico" enriquecidos**: cada dica agora tem explicação + exemplo de uso (Português do dia, Conectivo do dia, Palavra jurídica do dia).
7. **Reestruturamos o layout do painel**: seletor de modo em formato de "pílulas" no topo, texto original e texto revisado lado a lado (em vez de colunas separadas), caixas alinhadas e botões com largura padronizada.

## Como continuar mexendo no futuro

1. Abra a pasta do projeto no VS Code (ou no terminal): `~/Documents/MeusProjetos/juristexto`
2. Continue essa mesma conversa no Claude Code, ou abra uma nova dizendo "esse é o projeto JurisTexto, já publicado na Vercel"
3. Peça a mudança que quiser
4. As alterações são enviadas ao GitHub automaticamente (`git push`), e a Vercel republica o site sozinha em 1-2 minutos

## Onde ficam as configurações

- **Chave da IA**: painel da Vercel → projeto `juristexto` → Settings → Environment Variables → `GEMINI_API_KEY`
- **Link fixo do site**: painel da Vercel → projeto `juristexto` → aba Domains
- **Cota gratuita do Gemini**: renova todo dia, suficiente para uso pessoal. Se um dia acabar, é só esperar o dia seguinte ou ativar billing na conta Google.

## Pontos de atenção

- O link do site é público — qualquer pessoa com o link pode usar e isso consome da sua cota gratuita da IA. Por enquanto é só para uso pessoal (decisão tomada em 19/08/2026). Se um dia quiser compartilhar com mais gente, é recomendável adicionar uma senha de acesso antes.
