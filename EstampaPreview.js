import { useState } from 'react';

// Componente para exibir a prévia da estampa gerada (versão otimizada)
export default function EstampaPreview({ url, onDownload }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Chamar a API de upscaling no backend
      const response = await fetch('/api/highres-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao processar imagem');
      }

      const data = await response.json();
      
      // Abrir a imagem processada em uma nova aba
      window.open(data.imageUrl, '_blank');
    } catch (error) {
      console.error('Erro no processamento:', error);
      setError(error.message || 'Ocorreu um erro ao processar a imagem');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="estampa-preview">
      <div className="imagem-container">
        <img 
          src={url} 
          alt="Estampa gerada" 
          className="estampa-imagem"
        />
      </div>
      
      <button 
        onClick={handleDownload} 
        className="botao-download"
        disabled={loading}
      >
        {loading ? 'Processando...' : 'Baixar p/ Impressão'}
      </button>
      
      {error && <div className="erro-download">{error}</div>}
      
      <style jsx>{`
        .estampa-preview {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        
        .imagem-container {
          width: 100%;
          margin-bottom: 15px;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .estampa-imagem {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .botao-download {
          background: #2196F3;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.3s;
        }
        
        .botao-download:hover {
          background: #0b7dda;
        }
        
        .botao-download:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .erro-download {
          color: #d32f2f;
          margin-top: 10px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
