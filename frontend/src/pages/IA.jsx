import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const IA = () => {
  const [text, setText] = useState('');
  const [res, setRes] = useState('');

  const consulta = async () => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
      console.log("Mi clave:", apiKey);

      // Inicializamos la API
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // Usamos lo que el usuario escribe en 'text'
      const prompt = text || 'Explain how AI works';

      // Generamos el contenido
      const result = await model.generateContent(prompt);

      // Si result.response.text() es una Promise, necesitamos await
      const responseText = await result.response.text();
      setRes(responseText);
      console.log(responseText);
    } catch (error) {
      console.error('Error generando respuesta:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página recargue
    consulta();         // Llamamos a la función que invoca la API
  };

  const handleChange = (e) => {
    setText(e.target.value); // Actualiza el texto con lo que escribe el usuario
  };

  return (
    <div className='bg-white'>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={handleChange}
        />
        <input type="submit" value="Probar" />
      </form>

      <p>Respuesta:</p>
      <p>{res}</p>
    </div>
  );
};

export default IA;
