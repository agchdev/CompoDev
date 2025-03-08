import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import html2canvas from 'html2canvas';
import CodeMirror from '@uiw/react-codemirror';
import Result from '../components/ide/Result'; 
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';

/** Componente que muestra la vista previa directamente en un <div>
 *  con dangerouslySetInnerHTML, en lugar de un iframe.
 */
function Resultado({ srcCode }) {
  return (
    <div id="result-preview" className="bg-gray-900 p-4 shadow mt-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-white">Result</h2>
      {/* Mostramos el resultado embebido para que html2canvas pueda capturarlo */}
      <div
        className="w-full min-h-[300px] bg-white border border-gray-700 rounded-md p-3"
        dangerouslySetInnerHTML={{ __html: srcCode }}
      />
    </div>
  );
}

const Ide = () => {
  // Parámetro de la URL (ruta /ide/:id)
  const { id } = useParams();

  // Estados para el HTML, CSS y JS
  const [html_edit, setHtml_Edit] = useState('');
  const [css_edit, setCss_Edit]   = useState('');
  const [js_edit, setJs_Edit]     = useState('');
  const [mini, setMini]     = useState('');

  // Cargar el proyecto desde el backend
  useEffect(() => {
    const extraerProyecto = async () => {
      try {
        const formData = new FormData();
        formData.append('id', id);

        const response = await axios.post(
          'http://localhost/CompoDev/backend/verProyecto.php',
          formData,
          { withCredentials: true }
        );

        const proyecto = response.data[0];
        if (proyecto) {
          setHtml_Edit(proyecto.html || '');
          setCss_Edit(proyecto.css || '');
          setJs_Edit(proyecto.js || '');
        }
      } catch (error) {
        console.error('Error al obtener proyecto:', error);
      }
    };

    extraerProyecto();
  }, [id]);

  // Handlers de cambio de cada editor
  const onChangeHtml = useCallback(value => setHtml_Edit(value), []);
  const onChangeCss  = useCallback(value => setCss_Edit(value), []);
  const onChangeJS   = useCallback(value => setJs_Edit(value), []);

  // Contenido que renderizamos en la vista previa
  const srcCode = `
    <body>${html_edit}</body>
    <style>${css_edit}</style>
    <script>${js_edit}</script>
  `;

  // Función para actualizar proyecto en BD
  const subirBD = async () => {
    try {
        // Reemplazamos 'oklch(...)' ...
        const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
        styles.forEach((styleEl) => {
          if (styleEl.innerHTML) {
            styleEl.innerHTML = styleEl.innerHTML.replace(/oklch\(.*?\)/g, '#000');
          }
        });
      
        const elemento = document.getElementById('result-preview');
        if (!elemento) return;
      
        const canvas = await html2canvas(elemento);
        const dataURL = canvas.toDataURL('image/png');
      
        // En vez de { id, screenshot: dataURL }, usamos FormData:
        const formData = new FormData();
        formData.append('id', id);
        formData.append('screenshot', dataURL);
      
        const response = await axios.post(
          'http://localhost/CompoDev/backend/subirMiniatura.php',
          formData,                // <-- Enviamos FormData
          { withCredentials: true }
        );
      
        console.log('Miniatura guardada en el backend:', response.data);
        setMini(response.data.file)
      
      } catch (error) {
        console.error('Error al generar la miniatura:', error);
      }
      
    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('html_edit', html_edit);
      formData.append('css_edit', css_edit);
      formData.append('js_edit', js_edit);
      formData.append('mini', mini);

      const response = await axios.post(
        'http://localhost/CompoDev/backend/actualizarProyecto.php',
        formData,
        { withCredentials: true }
      );

      console.log('Respuesta al guardar cambios:', response.data);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
  };

  return (
    <div className="p-2 text-white">
      {/* Editores */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
        {/* HTML Editor */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
          <CodeMirror
            className="text-xl border-gray-700 border"
            value={html_edit}
            height="342px"
            theme="dark"
            extensions={[html()]}
            onChange={onChangeHtml}
          />
        </div>
        
        {/* CSS Editor */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
          <CodeMirror
            className="text-xl border-gray-700 border"
            value={css_edit}
            height="342px"
            theme="dark"
            extensions={[css()]}
            onChange={onChangeCss}
          />
        </div>
        
        {/* JS Editor */}
        <div className="bg-gradient-to-r from-amber-300 to-yellow-400 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2>
          <CodeMirror
            className="text-xl border-gray-700 border"
            value={js_edit}
            height="342px"
            theme="dark"
            extensions={[javascript()]}
            onChange={onChangeJS}
          />
        </div>
      </div>

      {/* Vista previa */}
      <Resultado srcCode={srcCode} />
      <Result srcCode={srcCode} />
      {/* Botones */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={subirBD}
          className="px-3 py-2 bg-white text-black rounded cursor-pointer z-100"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default Ide;
