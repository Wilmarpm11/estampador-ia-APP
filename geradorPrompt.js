// Função para gerar o prompt para a API da OpenAI
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com detalhes técnicos para estampas profissionais editáveis no Photoshop
  const prompt = `
Crie uma estampa profissional com as seguintes características:

- Estilo: ${estilo}
- Cores principais: ${cores}
- Fundo: ${fundo}

REQUISITOS TÉCNICOS ESSENCIAIS:
1. TILEÁVEL/SEAMLESS: A estampa deve ser perfeitamente tileável (seamless pattern), sem emendas visíveis quando repetida horizontalmente e verticalmente.
2. ELEMENTOS SEPARADOS EM CAMADAS: Desenhe os elementos principais separados e bem definidos, como se estivessem em camadas distintas do Photoshop.
3. FORMATO PARA EDIÇÃO: Estrutura compatível com edição em PSD, com elementos claramente separáveis.
4. QUALIDADE DE IMPRESSÃO: Alta resolução (300 DPI), formato RGB otimizado para impressão digital.
5. PROPORÇÃO: Desenhe em proporção quadrada (1:1) para facilitar o tileamento.

IMPORTANTE: Esta estampa será editada no Photoshop. Os elementos devem ter contornos claros e bem definidos, permitindo seleção e edição individual. Evite gradientes complexos ou efeitos que dificultem a separação dos elementos.

Crie uma estampa profissional que atenda a todos estes requisitos técnicos.
`.trim();
  
  return prompt;
}
