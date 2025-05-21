import { useState } from 'react';
import { gerarPrompt } from './geradorPrompt';
import EstampaPreview from './EstampaPreview';

export default function PaginaGeradorEstampa() {
  // Estados para controlar os inputs do formulário
  const [estilo, setEstilo] = useState('');
  const [cores, setCores] = useState('');
  const [fundo, setFundo] = useState('');
  
  // Estados para controlar o processo de geração
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState(null);
  const [erroBigJPG, setErroBigJPG] = useState(false);
  const [erro, setErro] = useState('');

  // Função para gerar as imagens
  const gerarImagens = async () => {
    // Validação básica
    if (!estilo || !cores || !fundo) {
      setErro('Por favor, preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      setErro('');
      setErroBigJPG(false);
      
      // Gerar o prompt para a API
      const prompt = gerarPrompt(estilo, cores, fundo);
      console.log('Prompt gerado:', prompt);
      
      // Chamar a API de geração de imagens
      const response = await fetch('/api/gerar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao gerar imagens');
      }

      const data = await response.json();
      setImagens({
        original: data.original,
        variacao: data.variacao
      });
    } catch (error) {
      console.error('Erro:', error);
      setErro(error.message || 'Ocorreu um erro ao gerar as imagens');
    } finally {
      setLoading(false);
    }
  };

  // Função para fazer upscaling da imagem com BigJPG
  const upscaleComBigJPG = async (url) => {
    try {
      setErroBigJPG(false);
      
      // Verificar se a chave da API do BigJPG está configurada
      const bigJpgApiKey = process.env.NEXT_PUBLIC_BIGJPG_API_KEY;
      if (!bigJpgApiKey) {
        throw new Error('Chave da API BigJPG não configurada');
      }

      // Criar tarefa de upscaling no BigJPG
      const createTaskResponse = await fetch('https://bigjpg.com/api/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': bigJpgApiKey
        },
        body: JSON.stringify({
          url: url,
          style: 'photo',
          noise: 3,
          scale: 8
        })
      });

      if (!createTaskResponse.ok) {
        if (createTaskResponse.status === 401) {
          setErroBigJPG(true);
          throw new Error('Autenticação falhou. Verifique sua chave de API do BigJPG.');
        }
        throw new Error(`Erro ao criar tarefa de upscaling: ${createTaskResponse.statusText}`);
      }

      const taskData = await createTaskResponse.json();
      const taskId = taskData.task_id;

      // Polling para verificar o status da tarefa
      let resultUrl = null;
      let attempts = 0;
      const maxAttempts = 10; // Aproximadamente 40 segundos (10 tentativas * 4 segundos)

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 4000)); // Esperar 4 segundos

        const statusResponse = await fetch(`https://bigjpg.com/api/task/${taskId}/status`, {
          headers: {
            'X-API-KEY': bigJpgApiKey
          }
        });

        if (!statusResponse.ok) {
          throw new Error(`Erro ao verificar status da tarefa: ${statusResponse.statusText}`);
        }

        const statusData = await statusResponse.json();
        
        if (statusData.status === 'success') {
          resultUrl = statusData.result.url;
          break;
        } else if (statusData.status === 'error') {
          throw new Error(`Erro no processamento da imagem: ${statusData.message}`);
        }

        attempts++;
      }

      if (!resultUrl) {
        throw new Error('Tempo esgotado ao aguardar o processamento da imagem');
      }

      // Abrir a imagem em uma nova aba
      window.open(resultUrl, '_blank');
    } catch (error) {
      console.error('Erro no upscaling:', error);
      if (error.message.includes('401') || error.message.includes('Autenticação falhou')) {
        setErroBigJPG(true);
      }
      alert(`Erro ao processar imagem: ${error.message}`);
    }
  };

  // Função para limpar e reiniciar
  const refazerEstampa = () => {
    setImagens(null);
    setErro('');
    setErroBigJPG(false);
  };

  return (
    <div className="container">
      <h1>Gerador de Estampa com IA</h1>
      
      {!imagens ? (
        <div className="formulario">
          <div className="campo">
            <label htmlFor="estilo">Estilo da Estampa:</label>
            <input
              type="text"
              id="estilo"
              value={estilo}
              onChange={(e) => setEstilo(e.target.value)}
              placeholder="Ex: floral, geométrico, abstrato..."
            />
          </div>
          
          <div className="campo">
            <label htmlFor="cores">Cores Principais:</label>
            <input
              type="text"
              id="cores"
              value={cores}
              onChange={(e) => setCores(e.target.value)}
              placeholder="Ex: azul e branco, vermelho e preto..."
            />
          </div>
          
          <div className="campo">
            <label htmlFor="fundo">Cor de Fundo:</label>
            <input
              type="text"
              id="fundo"
              value={fundo}
              onChange={(e) => setFundo(e.target.value)}
              placeholder="Ex: branco, transparente, azul claro..."
            />
          </div>
          
          {erro && <div className="erro">{erro}</div>}
          
          <button 
            onClick={gerarImagens} 
            disabled={loading}
            className="botao-gerar"
          >
            {loading ? 'Gerando imagens...' : 'Gerar imagem com IA'}
          </button>
        </div>
      ) : (
        <div className="resultados">
          <div className="estampas-container">
            <div className="estampa-item">
              <h3>Estampa Original</h3>
              <EstampaPreview 
                url={imagens.original} 
                onDownload={() => upscaleComBigJPG(imagens.original)} 
              />
            </div>
            
            <div className="estampa-item">
              <h3>Variação</h3>
              <EstampaPreview 
                url={imagens.variacao} 
                onDownload={() => upscaleComBigJPG(imagens.variacao)} 
              />
            </div>
          </div>
          
          {erroBigJPG && (
            <div className="erro-bigjpg">
              ❗ Seus créditos no BigJPG podem ter acabado ou a chave de API está inválida.
            </div>
          )}
          
          <button 
            onClick={refazerEstampa} 
            className="botao-refazer"
          >
            Refazer Estampa
          </button>
        </div>
      )}
      
      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        
        .formulario {
          background: #f9f9f9;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .campo {
          margin-bottom: 20px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          color: #555;
        }
        
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .botao-gerar, .botao-refazer {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          transition: background 0.3s;
        }
        
        .botao-gerar:hover, .botao-refazer:hover {
          background: #45a049;
        }
        
        .botao-gerar:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .erro {
          color: #d32f2f;
          margin-bottom: 15px;
          font-size: 14px;
        }
        
        .erro-bigjpg {
          color: #d32f2f;
          margin: 15px 0;
          text-align: center;
          font-weight: bold;
        }
        
        .resultados {
          margin-top: 20px;
        }
        
        .estampas-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .estampa-item {
          flex: 1;
          min-width: 300px;
          background: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .estampa-item h3 {
          text-align: center;
          margin-bottom: 15px;
          color: #333;
        }
        
        .estampa-imagem {
          width: 100%;
          height: auto;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        
        .botao-download {
          background: #2196F3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          width: 100%;
          transition: background 0.3s;
        }
        
        .botao-download:hover {
          background: #0b7dda;
        }
        
        @media (max-width: 768px) {
          .estampas-container {
            flex-direction: column;
          }
          
          .estampa-item {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
