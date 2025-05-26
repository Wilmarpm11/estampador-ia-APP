// Função para gerar o prompt para a API da OpenAI
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com detalhes técnicos para estampas profissionais editáveis no Photoshop
  // com ênfase em elementos naturais realistas e padrões perfeitamente tileáveis
  const prompt = `
Crie uma estampa profissional com as seguintes características:

- Estilo: ${estilo}
- Cores principais: ${cores}
- Fundo: ${fundo}

REQUISITOS TÉCNICOS ESSENCIAIS:
1. TILEÁVEL/SEAMLESS: A estampa deve ser PERFEITAMENTE tileável (seamless pattern), sem qualquer emenda visível quando repetida. Os elementos nas bordas devem se conectar harmoniosamente.

2. ELEMENTOS NATURAIS HIPER-REALISTAS: Qualquer elemento natural (plantas, animais, insetos, etc.) deve ser representado com extremo realismo fotográfico, com detalhes precisos de textura, sombras e proporções anatômicas corretas.

3. SEPARAÇÃO CLARA DE ELEMENTOS: Desenhe cada elemento principal com bordas bem definidas e separadas do fundo, como se estivessem em camadas distintas do Photoshop.

4. QUALIDADE DE IMPRESSÃO PROFISSIONAL: Alta resolução (300 DPI), formato RGB otimizado para impressão digital têxtil.

5. PROPORÇÃO QUADRADA: Desenhe em proporção 1:1 para facilitar o tileamento perfeito.

6. CONTRASTE ADEQUADO: Garanta que os elementos principais tenham contraste suficiente com o fundo para fácil seleção e edição.

IMPORTANTE: Esta estampa será editada no Photoshop e usada para impressão profissional. Os elementos devem ter contornos claros, detalhes realistas e estrutura que permita edição individual. Se incluir animais, insetos ou elementos da natureza, eles devem parecer fotograficamente reais, não estilizados ou cartunizados.

Crie uma estampa profissional que atenda a todos estes requisitos técnicos, com foco especial no realismo dos elementos naturais e na perfeita tileabilidade do padrão.
`.trim();
  
  return prompt;
}
