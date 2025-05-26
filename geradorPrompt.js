// Função para gerar o prompt para a API da OpenAI
export function gerarPrompt(estilo, cores, fundo) {
  // Validação básica dos parâmetros
  if (!estilo || !cores || !fundo) {
    throw new Error('Todos os parâmetros são obrigatórios');
  }

  // Construção do prompt com detalhes técnicos para qualidade de impressão
  // Mantendo simplicidade mas adicionando instruções específicas para tileabilidade
  const prompt = `Estampa têxtil tileável com estilo ${estilo}, nas cores ${cores}, com fundo ${fundo}. 
A estampa deve ser perfeitamente tileável (repetir sem emendas visíveis), com elementos bem distribuídos, 
alta qualidade para impressão digital (300DPI), formato RGB. Os elementos devem ter bordas bem definidas 
para fácil edição no Photoshop.`;
  
  return prompt;
}
