// Componente para exibir a prévia da estampa gerada
export default function EstampaPreview({ url, onDownload }) {
  return (
    <div className="estampa-preview">
      <img src={url} alt="Estampa gerada" className="estampa-imagem" />
      <button 
        onClick={onDownload} 
        className="botao-download"
      >
        Baixar p/ Impressão
      </button>
    </div>
  );
}
