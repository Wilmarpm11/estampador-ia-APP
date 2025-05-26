// API para geração de imagens com logs detalhados
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório' });
    }

    // Verificar se a chave da API da OpenAI está configurada
    const openaiApiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      console.error('Chave da API OpenAI não configurada');
      return res.status(500).json({ error: 'Chave da API OpenAI não configurada' });
    }

    console.log('Iniciando geração de imagem com prompt:', prompt);
    console.log('Usando chave de API (primeiros 5 caracteres):', openaiApiKey.substring(0, 5) + '...');

    // Chamada direta para a API da OpenAI usando fetch
    console.log('Fazendo chamada para API da OpenAI para imagem original...');
    const responseOriginal = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-2", // Usando DALL-E 2 que é mais estável
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });

    console.log('Status da resposta da API (imagem original):', responseOriginal.status);
    
    if (!responseOriginal.ok) {
      const errorData = await responseOriginal.text();
      console.error('Erro na API OpenAI (imagem original):', errorData);
      return res.status(responseOriginal.status).json({ 
        error: 'Erro ao gerar imagem original', 
        details: errorData 
      });
    }

    const dataOriginal = await responseOriginal.json();
    console.log('Resposta da API recebida para imagem original');
    
    if (!dataOriginal.data || !dataOriginal.data[0] || !dataOriginal.data[0].url) {
      console.error('Resposta da API não contém URL da imagem:', JSON.stringify(dataOriginal));
      return res.status(500).json({ 
        error: 'Resposta da API não contém URL da imagem', 
        details: JSON.stringify(dataOriginal)
      });
    }

    const imageUrl1 = dataOriginal.data[0].url;
    console.log('URL da imagem original recebida');

    // Chamada para a API da OpenAI para gerar a segunda imagem (variação)
    console.log('Fazendo chamada para API da OpenAI para imagem variação...');
    const responseVariacao = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-2", // Usando DALL-E 2 que é mais estável
        prompt: prompt + " (variação alternativa)",
        n: 1,
        size: "1024x1024"
      })
    });

    console.log('Status da resposta da API (imagem variação):', responseVariacao.status);

    if (!responseVariacao.ok) {
      const errorData = await responseVariacao.text();
      console.error('Erro na API OpenAI (imagem variação):', errorData);
      
      // Mesmo com erro na segunda imagem, retornamos a primeira com sucesso parcial
      return res.status(200).json({
        success: true,
        partial: true,
        original: imageUrl1,
        error_variacao: errorData
      });
    }

    const dataVariacao = await responseVariacao.json();
    console.log('Resposta da API recebida para imagem variação');
    
    if (!dataVariacao.data || !dataVariacao.data[0] || !dataVariacao.data[0].url) {
      console.error('Resposta da API não contém URL da imagem variação:', JSON.stringify(dataVariacao));
      
      // Mesmo com erro na segunda imagem, retornamos a primeira com sucesso parcial
      return res.status(200).json({
        success: true,
        partial: true,
        original: imageUrl1,
        error_variacao: 'Resposta da API não contém URL da imagem variação'
      });
    }

    const imageUrl2 = dataVariacao.data[0].url;
    console.log('URL da imagem variação recebida');
    console.log('Geração de imagens concluída com sucesso');

    // Retornar as URLs das duas imagens geradas
    return res.status(200).json({
      success: true,
      original: imageUrl1,
      variacao: imageUrl2
    });
    
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return res.status(500).json({ 
      error: 'Erro interno do servidor', 
      details: error.message,
      stack: error.stack
    });
  }
}
