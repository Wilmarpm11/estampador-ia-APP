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

2. COMPOSIÇÃO EQUILIBRADA: Distribua os elementos de forma equilibrada, com áreas de respiro (como nas estampas de referência com fundo branco ou áreas menos densas). Evite aglomerações excessivas de elementos.

3. ELEMENTOS NATURAIS DETALHADOS: Inclua elementos naturais com alto nível de detalhamento:
   - Folhagens tropicais com nervuras visíveis e variações de tom
   - Flores com pétalas detalhadas e sombreamento realista
   - Se incluir animais, represente-os com detalhes precisos de plumagem, pelagem ou escamas

4. PADRÕES DE BASE: Inclua padrões de base (como animal print, texturas naturais) que se repitam perfeitamente, servindo como fundo para elementos maiores.

5. ESPECIFICAÇÕES TÉCNICAS: 
   - Resolução: 300 DPI mínimo para impressão digital têxtil
   - Formato: RGB otimizado para impressão
   - Proporção: Exatamente 1:1 (quadrada)
   - Contraste: Alto o suficiente para definição clara dos elementos

6. ESTRUTURA PARA EDIÇÃO: Desenhe cada elemento principal com bordas nítidas e bem definidas, com espaço suficiente entre eles para fácil seleção no Photoshop.

IMPORTANTE: Esta estampa será usada para impressão têxtil profissional. Crie uma estampa que se repita perfeitamente em todas as direções (horizontalmente e verticalmente), mantendo a continuidade visual sem emendas visíveis, exatamente como nas estampas de referência da indústria têxtil.
`.trim();
  
  return prompt;
}
