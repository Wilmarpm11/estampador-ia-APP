// Função para gerar o prompt para a API da OpenAI com foco em ultra-realismo
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com técnicas avançadas para ultra-realismo
  const prompt = `
Crie uma estampa profissional ULTRA-REALISTA com as seguintes características:

- Estilo: ${estilo}
- Cores principais: ${cores}
- Fundo: ${fundo}

REQUISITOS TÉCNICOS ESSENCIAIS:
1. ULTRA-REALISMO FOTOGRÁFICO: Qualquer elemento natural DEVE parecer uma fotografia profissional de alta definição. Use técnicas de iluminação de estúdio, profundidade de campo apropriada, e detalhes microscópicos como veias em folhas, texturas de pele/penas/escamas em animais, e reflexos naturais de luz.

2. PERFEITA TILEABILIDADE: A estampa DEVE ser matematicamente perfeita para repetição sem emendas visíveis. Os elementos nas bordas devem se conectar harmoniosamente quando o padrão é repetido. Evite elementos que cruzam as bordas a menos que continuem perfeitamente do outro lado.

3. SEPARAÇÃO CLARA PARA EDIÇÃO: Cada elemento principal DEVE ter bordas nítidas e bem definidas, com espaço suficiente entre eles para fácil seleção no Photoshop. Pense em cada elemento como uma camada separada.

4. ESPECIFICAÇÕES TÉCNICAS: 
   - Resolução: 300 DPI mínimo
   - Formato: RGB otimizado para impressão digital têxtil
   - Proporção: Exatamente 1:1 (quadrada)
   - Contraste: Alto o suficiente para fácil seleção de elementos

5. DETALHES MICROSCÓPICOS: Inclua detalhes minuciosos que seriam visíveis em uma fotografia macro profissional:
   - Para plantas: nervuras de folhas, texturas de pétalas, gradientes sutis
   - Para animais: pelos individuais, escamas detalhadas, plumagem realista
   - Para insetos: estruturas de asas transparentes, olhos compostos, antenas articuladas

IMPORTANTE: Esta estampa será usada para impressão têxtil profissional e editada no Photoshop. Os elementos devem parecer fotografias reais, não ilustrações ou desenhos. Use técnicas de fotografia profissional como iluminação de três pontos, profundidade de campo controlada, e composição equilibrada.

Crie uma estampa com realismo fotográfico indistinguível de fotografias reais, mantendo perfeita tileabilidade e estrutura adequada para edição profissional.
`.trim();
  
  return prompt;
}
