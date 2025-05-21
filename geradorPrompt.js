// Função para gerar o prompt para a API da OpenAI
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com detalhes técnicos para qualidade de impressão
  const prompt = `Estampa com estilo ${estilo}, nas cores ${cores}, com fundo ${fundo}, realista, tileável, 300DPI, 50x50cm, padrão CMYK.`;
  
  return prompt;
}
