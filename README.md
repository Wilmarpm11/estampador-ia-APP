# Estampador com IA

Aplicação Next.js para geração de estampas utilizando Inteligência Artificial (OpenAI/DALL-E) com funcionalidade de upscaling via BigJPG.

## Funcionalidades

- Geração de estampas personalizadas com IA baseadas em estilo, cores e fundo
- Criação de duas variações de cada estampa
- Upscaling de imagens para alta resolução (até 8x) para impressão
- Interface responsiva e amigável

## Requisitos

- Node.js 18 LTS ou superior
- Conta na OpenAI com API Key para DALL-E
- Conta no BigJPG com API Key para upscaling

## Instalação

1. Extraia o conteúdo deste ZIP em uma pasta
2. Abra o terminal na pasta extraída
3. Execute `npm install` para instalar as dependências
4. Crie um arquivo `.env.local` na raiz do projeto (copie de `.env.local.example`)
5. Adicione suas chaves de API no arquivo `.env.local`

## Execução Local

Execute o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

## Como Usar

1. Preencha o formulário com:
   - Estilo da estampa (ex: floral, geométrico, abstrato)
   - Cores principais (ex: azul e branco, vermelho e preto)
   - Cor de fundo (ex: branco, transparente, azul claro)

2. Clique em "Gerar imagem com IA" e aguarde a geração das estampas

3. Visualize as duas variações geradas

4. Para obter a versão em alta resolução, clique em "Baixar p/ Impressão" 

## Deploy no Vercel

Para publicar a aplicação no Vercel:

1. Crie uma conta no Vercel (vercel.com)
2. Clique em "Add New... -> Project"
3. Importe o projeto do GitHub ou faça upload da pasta
4. Configure as variáveis de ambiente:
   - OPENAI_API_KEY
   - NEXT_PUBLIC_BIGJPG_API_KEY
5. Clique em "Deploy"
