// Função para gerar o prompt para a API da OpenAI com foco em estampas tileáveis profissionais
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com técnicas específicas para estampas tileáveis profissionais
  const prompt = `
Crie uma estampa têxtil profissional PERFEITAMENTE TILEÁVEL com as seguintes características:

- Estilo: ${estilo}
- Cores principais: ${cores}
- Fundo: ${fundo}

REQUISITOS TÉCNICOS ESSENCIAIS:

1. TILEABILIDADE PERFEITA: A estampa DEVE ser matematicamente perfeita para repetição contínua sem emendas visíveis. Os elementos nas bordas devem se conectar harmoniosamente quando o padrão é repetido, como nas estampas têxteis profissionais.

2. COMPOSIÇÃO EQUILIBRADA: Distribua os elementos de forma equilibrada, com áreas de respiro.

3. ELEMENTOS NATURAIS DETALHADOS: Inclua elementos naturais com alto nível de detalhamento.
  

4. ESPECIFICAÇÕES TÉCNICAS: 
   - Resolução: 300 DPI mínimo para impressão digital têxtil
   - Formato: RGB otimizado para impressão
   - Proporção: Exatamente 1:1 (quadrada)
   - Contraste: Alto o suficiente para definição clara dos elementos

5. ESTRUTURA PARA EDIÇÃO: No Photoshop.

IMPORTANTE: Esta estampa será usada para impressão têxtil profissional. Crie uma estampa que se repita perfeitamente em todas as direções (horizontalmente e verticalmente), mantendo a continuidade visual sem emendas visíveis, exatamente como nas estampas de referência da indústria têxtil.
`.trim();
  
  return prompt;
}
