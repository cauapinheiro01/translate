import React, { useState } from 'react';
import styles from "./Translator.module.css"; 
import axios from "axios";

function Translator() {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.get('https://api.mymemory.translated.net/get', {
        params: {
          q: inputText,
          langpair: `pt|${targetLanguage}`,
        },
      });
      setTranslatedText(response.data.responseData.translatedText);
    } catch (e) {
      alert('Erro ao traduzir', e);
      setTranslatedText('Erro ao traduzir');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.perg}>
        <input 
          placeholder="Digite o texto para traduzir" 
          value={inputText} 
          onChange={(e) => setInputText(e.target.value)} 
        />
        <select 
          value={targetLanguage} 
          onChange={(e) => setTargetLanguage(e.target.value)}
        >
          <option value="en">Inglês</option>
          <option value="pt">Português</option>
          <option value="es">Espanhol</option>
          <option value="fr">Francês</option>
          <option value="de">Alemão</option>
          <option value="it">Italiano</option>
          <option value="ja">Japonês (日本語)</option>
          <option value="zh">Chinês (中文)</option>
        </select>
        <button onClick={handleTranslate}>Traduzir</button>
      </div>
      <div className={styles.resp}>
        <input 
          value={translatedText} 
          readOnly 
          placeholder='Tradução'
        />
      </div>
    </div>
  );
}

export default Translator;
