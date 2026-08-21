# Guia de inicio: GitHub e Copilot

Este guia serve para configurar a conta estudantil `jumagitha` sem perder o acesso ao projeto `juristexto`.

## 1. Entender as duas contas

- `jumagitha`: conta estudantil. Use-a no Copilot e para novos projetos.
- `fernandajumapacheco`: conta principal. O repositório `juristexto` continua nela.

O VS Code pode trabalhar com as duas contas. Não é necessário mover o `juristexto` para usar o Copilot estudantil.

## 2. Configurar o Copilot

1. Abra o menu de contas no canto superior direito do VS Code.
2. Escolha `jumagitha`.
3. Em **Manage Trusted Extensions**, deixe **GitHub Copilot** e **GitHub** marcados.
4. Clique em **OK**.
5. Abra o painel do Copilot e confirme que a conta exibida é `jumagitha`.

Se o Copilot mostrar a conta errada, use **Sign Out** somente no menu do GitHub/Copilot e entre novamente com `jumagitha`.

## 3. Ver os repositórios no site

Essa lista não fica no editor. No navegador:

1. Acesse [github.com](https://github.com/).
2. Entre com `jumagitha`.
3. Clique na sua foto, no canto superior direito.
4. Clique em **Your repositories**.

Não apague nada antes de conferir o nome. Quando houver dúvida, arquive o repositório em vez de excluí-lo.

## 4. Revisar acessos antigos

No GitHub, abra sua foto → **Settings** e revise:

- **Developer settings → Personal access tokens**: tokens usados por programas.
- **SSH and GPG keys**: chaves usadas pelo computador.
- **Applications**: aplicativos autorizados.

Revogue apenas um item que você reconhece como antigo ou desconhecido. O acesso do `juristexto` usa a conta principal e pode depender de uma chave SSH configurada no computador.

## 5. Segredos do JurisTexto

A chave `GEMINI_API_KEY` fica somente na Vercel, em **Project → Settings → Environment Variables**. Ela não deve ser colocada neste projeto, em mensagens ou no GitHub.

Antes de apagar ou revogar qualquer credencial, confirme que o site publicado continua funcionando: [juristexto.vercel.app](https://juristexto.vercel.app/).

## 6. Como aprender com o Copilot

Use perguntas que peçam explicação, não apenas código:

> Explique este arquivo como se eu nunca tivesse programado.

> Mostre o que mudou e explique cada linha antes de alterar o arquivo.

> Quero aprender GitHub do zero. Dê apenas o próximo passo e espere minha confirmação.

> Analise este erro, explique a causa e proponha uma correção segura.

Comece aprendendo, nesta ordem: arquivos e pastas, Git, commit, repositório, branch, push e pull request.