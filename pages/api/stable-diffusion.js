// API para geração de imagens com Stable Diffusion
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

    // Chave da API do Stable Diffusion (você precisará criar uma conta e obter uma chave)
    // https://stablediffusionapi.com/ ou outro provedor similar
    const stableDiffusionApiKey = process.env.STABLE_DIFFUSION_API_KEY;
    
    if (!stableDiffusionApiKey) {
      return res.status(500).json({ error: 'Chave da API Stable Diffusion não configurada' });
    }

    console.log('Iniciando geração de imagem com Stable Diffusion. Prompt:', prompt);

    // Chamada para a API do Stable Diffusion para gerar a primeira imagem
    // Esta implementação usa a API pública do Stable Diffusion
    const responseOriginal = await fetch('https://stablediffusionapi.com/api/v3/text2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: stableDiffusionApiKey,
        prompt: prompt + ", seamless tile pattern, textile design, high quality, detailed",
        negative_prompt: "ugly, deformed, noisy, blurry, distorted, out of focus",
        width: "1024",
        height: "1024",
        samples: "1",
        num_inference_steps: "30",
        seed: null,
        guidance_scale: 7.5,
        safety_checker: "yes",
        webhook: null,
        track_id: null,
        tile_mode: "yes" // Modo tileável específico do Stable Diffusion
      })
    });

    if (!responseOriginal.ok) {
      const errorData = await responseOriginal.json();
      console.error('Erro na API Stable Diffusion (imagem original):', errorData);
      return res.status(responseOriginal.status).json({ 
        error: 'Erro ao gerar imagem original', 
        details: errorData 
      });
    }

    const dataOriginal = await responseOriginal.json();
    
    if (dataOriginal.status !== 'success' || !dataOriginal.output || !dataOriginal.output[0]) {
      console.error('Resposta da API não contém URL da imagem:', dataOriginal);
      return res.status(500).json({ 
        error: 'Resposta da API não contém URL da imagem', 
        details: dataOriginal
      });
    }

    const imageUrl1 = dataOriginal.output[0];
    console.log('URL da imagem original recebida');

    // Chamada para a API do Stable Diffusion para gerar a segunda imagem (variação)
    const responseVariacao = await fetch('https://stablediffusionapi.com/api/v3/text2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: stableDiffusionApiKey,
        prompt: prompt + ", seamless tile pattern, textile design, high quality, detailed, variation",
        negative_prompt: "ugly, deformed, noisy, blurry, distorted, out of focus",
        width: "1024",
        height: "1024",
        samples: "1",
        num_inference_steps: "30",
        seed: null,
        guidance_scale: 7.5,
        safety_checker: "yes",
        webhook: null,
        track_id: null,
        tile_mode: "yes" // Modo tileável específico do Stable Diffusion
      })
    });

    if (!responseVariacao.ok) {
      const errorData = await responseVariacao.json();
      console.error('Erro na API Stable Diffusion (imagem variação):', errorData);
      
      // Mesmo com erro na segunda imagem, retornamos a primeira com sucesso parcial
      return res.status(200).json({
        success: true,
        partial: true,
        original: imageUrl1,
        error_variacao: errorData
      });
    }

    const dataVariacao = await responseVariacao.json();
    
    if (dataVariacao.status !== 'success' || !dataVariacao.output || !dataVariacao.output[0]) {
      console.error('Resposta da API não contém URL da imagem variação:', dataVariacao);
      
      // Mesmo com erro na segunda imagem, retornamos a primeira com sucesso parcial
      return res.status(200).json({
        success: true,
        partial: true,
        original: imageUrl1,
        error_variacao: 'Resposta da API não contém URL da imagem variação'
      });
    }

    const imageUrl2 = dataVariacao.output[0];
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
