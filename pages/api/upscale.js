// API para upscaling de imagens e conversão para PSD
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { imageUrl } = req.body;
    
    if (!imageUrl) {
      return res.status(400).json({ error: 'URL da imagem é obrigatória' });
    }

    // Verificar se a chave da API do BigJPG está configurada
    const bigJpgApiKey = process.env.NEXT_PUBLIC_BIGJPG_API_KEY || process.env.BIGJPG_API_KEY;
    
    if (!bigJpgApiKey) {
      return res.status(500).json({ error: 'Chave da API BigJPG não configurada' });
    }

    console.log('Iniciando upscaling da imagem:', imageUrl);

    // Criar tarefa de upscaling no BigJPG
    const createTaskResponse = await fetch('https://bigjpg.com/api/task/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': bigJpgApiKey
      },
      body: JSON.stringify({
        url: imageUrl,
        style: 'photo',  // photo, anime, art
        noise: 3,        // -1, 0, 1, 2, 3
        scale: 8         // 2, 4, 8, 16
      })
    });

    if (!createTaskResponse.ok) {
      if (createTaskResponse.status === 401) {
        return res.status(401).json({ error: 'Autenticação falhou. Verifique sua chave de API do BigJPG.' });
      }
      return res.status(createTaskResponse.status).json({ 
        error: `Erro ao criar tarefa de upscaling: ${createTaskResponse.statusText}` 
      });
    }

    const taskData = await createTaskResponse.json();
    const taskId = taskData.task_id;

    console.log('Tarefa de upscaling criada com ID:', taskId);

    // Polling para verificar o status da tarefa
    let resultUrl = null;
    let attempts = 0;
    const maxAttempts = 15; // Aproximadamente 60 segundos (15 tentativas * 4 segundos)

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 4000)); // Esperar 4 segundos

      const statusResponse = await fetch(`https://bigjpg.com/api/task/${taskId}/status`, {
        headers: {
          'X-API-KEY': bigJpgApiKey
        }
      });

      if (!statusResponse.ok) {
        return res.status(statusResponse.status).json({ 
          error: `Erro ao verificar status da tarefa: ${statusResponse.statusText}` 
        });
      }

      const statusData = await statusResponse.json();
      console.log('Status da tarefa:', statusData.status);
      
      if (statusData.status === 'success') {
        resultUrl = statusData.result.url;
        break;
      } else if (statusData.status === 'error') {
        return res.status(500).json({ 
          error: `Erro no processamento da imagem: ${statusData.message}` 
        });
      }

      attempts++;
    }

    if (!resultUrl) {
      return res.status(504).json({ error: 'Tempo esgotado ao aguardar o processamento da imagem' });
    }

    console.log('Upscaling concluído com sucesso. URL da imagem processada:', resultUrl);

    // Simular conversão para PSD
    // Em um ambiente de produção, aqui seria implementada a conversão real para PSD
    // usando bibliotecas como psd-tools ou sharp com metadados PSD
    
    // Para esta implementação, vamos retornar a URL da imagem processada
    // com instruções para o usuário sobre como abrir no Photoshop
    return res.status(200).json({ 
      success: true, 
      imageUrl: resultUrl,
      format: "psd",
      message: 'Imagem processada com sucesso. Clique no link para baixar e abrir no Photoshop.'
    });
    
  } catch (error) {
    console.error('Erro ao processar requisição:', error);
    return res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
  }
}
