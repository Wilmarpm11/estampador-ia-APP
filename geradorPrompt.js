// Função para gerar o prompt para a API da OpenAI (versão simples)
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt simples e direto
  const prompt = `Estampa têxtil com estilo ${estilo}, nas cores ${cores}, com fundo ${fundo}.`;
  
  return prompt;
}
