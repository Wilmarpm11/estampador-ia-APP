// API para geração de imagens com OpenAI (versão otimizada)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório' });
    }

    // Tenta usar a variável sem prefixo primeiro, se não existir, usa a com prefixo
    const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'Chave da API OpenAI não configurada' });
    }

    console.log('Iniciando geração de imagem com prompt:', prompt);

    // Chamada para a API da OpenAI para gerar a primeira imagem
    // Não especificamos o modelo para usar o padrão da API
    const responseOriginal = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      })
    });

    if (!responseOriginal.ok) {
      const errorData = await responseOriginal.json();
      console.error('Erro na API OpenAI (imagem original):', errorData);
      return res.status(responseOriginal.status).json({ 
        error: 'Erro ao gerar imagem original', 
        details: errorData 
      });
    }

    const dataOriginal = await responseOriginal.json();
    
    // Chamada para a API da OpenAI para gerar a segunda imagem (variação)
    const responseVariacao = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        prompt: prompt + " (variação alternativa)",
        n: 1,
        size: '1024x1024'
      })
    });

    if (!responseVariacao.ok) {
      const errorData = await responseVariacao.json();
      console.error('Erro na API OpenAI (imagem variação):', errorData);
      
      // Mesmo com erro na segunda imagem, retornamos a primeira com sucesso parcial
      return res.status(200).json({
        success: true,
        partial: true,
        original: dataOriginal.data[0].url,
        error_variacao: errorData
      });
    }

    const dataVariacao = await responseVariacao.json();
    console.log('Geração de imagens concluída com sucesso');

    // Retornar as URLs das duas imagens geradas
    return res.status(200).json({
      success: true,
      original: dataOriginal.data[0].url,
      variacao: dataVariacao.data[0].url
    });
    
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
