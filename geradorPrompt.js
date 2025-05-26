// Função para gerar o prompt para a API da OpenAI com foco em estampas tileáveis (versão simplificada)
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt simplificado para estampas tileáveis
  const prompt = `
Crie uma estampa têxtil tileável com as seguintes características:

- Estilo: ${estilo}
- Cores principais: ${cores}
- Fundo: ${fundo}

REQUISITOS:
1. A estampa deve ser tileável (repetir sem emendas visíveis)
2. Elementos bem distribuídos com espaço entre eles
3. Alta qualidade para impressão digital
4. Elementos naturais detalhados e realistas

Crie uma estampa profissional para indústria têxtil.
`.trim();
  
  return prompt;
}
