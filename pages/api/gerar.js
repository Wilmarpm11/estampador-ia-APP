import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt é obrigatório' });
  }

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    // Gerar a primeira imagem
    const response1 = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    // Gerar a segunda imagem (variação)
    const response2 = await openai.createImage({
      prompt: prompt + " (variação alternativa)",
      n: 1,
      size: '1024x1024',
    });

    const imageUrl1 = response1.data.data[0].url;
    const imageUrl2 = response2.data.data[0].url;

    res.status(200).json({ 
      success: true, 
      imageUrl1, 
      imageUrl2 
    });
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    res.status(500).json({ 
      error: 'Erro ao gerar imagem', 
      details: error.message 
    });
  }
}
