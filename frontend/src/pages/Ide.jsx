import { useEffect, useState } from 'react'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Result from '../components/ide/Result';
import './Ide.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Ide = () => {
    // Obtenemos el parámetro id de la URL: /ide/:id
    const { id } = useParams();
    console.log(id)
    
    const [res, setRes] = useState(null);

    // Se crean los useStates que reciben el codigo
    const [html_edit, setHtml_Edit] = useState('');
    const [css_edit, setCss_Edit] = useState('');
    const [js_edit, setJs_Edit] = useState('');

    // Codigo HTML
    const onChangeHtml = useCallback((value) => {
        setHtml_Edit(value);
    }, []);

    // Codigo CSS
    const onChangeCss = useCallback((value) => {
        setCss_Edit(value);
    }, []);

    // Codigo JAVASCRIPT
    const onChangeJavaScript = useCallback((value) => {
        setJs_Edit(value);
    }, []);

    useEffect(() => {
        const extraerProyecto = async () => {
          try {
            const formData = new FormData();
            formData.append("id", id);
      
            // No hace falta establecer "Content-Type" manualmente,
            // axios lo gestionará como multipart/form-data
            const response = await axios.post(
              "http://localhost/CompoDev/backend/verProyecto.php",
              formData,
              { withCredentials: true }
            );
      
            // La respuesta es un array, de la forma response.data[0]
            const proyecto = response.data[0];
            console.log("Respuesta del servidor:", proyecto, id);
      
            // Ajustamos el estado local directamente con 'proyecto'
            setRes(proyecto);
            if (proyecto) {
              setHtml_Edit(proyecto.html || '');
              setCss_Edit(proyecto.css || '');
              setJs_Edit(proyecto.js || '');
            }
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }
        };
      
        extraerProyecto();
      }, [id]);

     const subirBD = (e) => {
        e.preventDefault()
        console.log(html_edit)
        console.log(css_edit)
        console.log(js_edit)
        const subir = async () => {
            try {
              const formData = new FormData();
              formData.append("id", id);
              formData.append("html_edit", html_edit);
              formData.append("css_edit", css_edit);
              formData.append("js_edit", js_edit);
        
              // No hace falta establecer "Content-Type" manualmente,
              // axios lo gestionará como multipart/form-data
              const response = await axios.post(
                "http://localhost/CompoDev/backend/actualizarProyecto.php",
                formData,
                { withCredentials: true }
              );
        
              // La respuesta es un array, de la forma response.data[0]
              const proyecto = response.data;
              console.log("Respuesta del servidor:", proyecto);
        
              // Ajustamos el estado local directamente con 'proyecto'
              setRes(proyecto);
              if (proyecto) {
                setHtml_Edit(proyecto.html || '');
                setCss_Edit(proyecto.css || '');
                setJs_Edit(proyecto.js || '');
              }
            } catch (error) {
              console.error("Error en la solicitud:", error);
            }
          };
        
          subir();
     }

    const srcCode = `
      <body>${html_edit}</body>
      <style>${css_edit}</style>
      <script>${js_edit}</script>
    `
    // console.log(res.html)

    return (
        <div>
            {/* main content  */}
            <div className="p-2">
                {/* Editor  */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2" >
                    {/* Html Editor */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-2 text-white">HTML</h2>
                        <CodeMirror
                            className="text-xl border-gray-700 border"
                            value={html_edit}
                            height="342px"
                            theme="dark"
                            extensions={[html(true)]}
                            onChange={onChangeHtml}
                        />
                    </div>
                    {/* Css Editor  */}
                    <div  
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-lg shadow"
                    >
                        <h2 className="text-lg font-semibold mb-2 text-white">CSS</h2>
                        <CodeMirror
                            className="text-xl border-gray-700 border"
                            value={css_edit}
                            height="342px"
                            theme="dark"
                            extensions={[css(true)]}
                            onChange={onChangeCss}
                        />
                    </div>
                    {/* JavaScript Editor  */}
                    <div
                        className="bg-gradient-to-r from-amber-300 to-yellow-400 p-4 rounded-lg shadow"
                    >
                        <h2 className="text-lg font-semibold mb-2 text-white">JavaScript</h2>
                        <CodeMirror
                            className="text-xl border-gray-700 border"
                            value={js_edit}
                            height="342px"
                            theme="dark"
                            extensions={[javascript(true)]}
                            onChange={onChangeJavaScript}
                        />
                    </div>
                </div>
                {/* Result  */}
                <Result
                    srcCode={srcCode}
                />
                <button className='px-3 py-2 bg-white cursor-pointer' onClick={(e) => subirBD(e)}>Añadir Proyecto</button>
            </div>
        </div>
    )
}

export default Ide