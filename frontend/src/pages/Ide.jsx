import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import Result from '../components/ide/Result';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import './Ide.css'
import { GoogleGenerativeAI } from '@google/generative-ai';

/** Componente que muestra la vista previa directamente en un <div>
 *  con dangerouslySetInnerHTML, en lugar de un iframe.
 */


const Ide = () => {
    // Parámetro de la URL (ruta /ide/:id)
    const { id } = useParams();

    // Estados para el HTML, CSS y JS
    const [html_edit, setHtml_Edit] = useState('');
    const [css_edit, setCss_Edit] = useState('');
    const [js_edit, setJs_Edit] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [text, setText] = useState('');
    const [res, setRes] = useState('');

    

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
    const onChangeCss = useCallback(value => setCss_Edit(value), []);
    const onChangeJS = useCallback(value => setJs_Edit(value), []);

    // Contenido que renderizamos en la vista previa
    const srcCode = `
    <body>${html_edit}</body>
    <style>${css_edit}</style>
    <script>${js_edit}</script>
  `;

  const consulta = async () => {
    try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        const instrucciones = import.meta.env.VITE_INSTRUCCIONES;
        console.log(instrucciones)

        // Inicializamos la API
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Usamos lo que el usuario escribe en 'text'
        const prompt =  instrucciones+" "+text+". Si quiere hacer cambios sobre lo anterior aquí te dejo la respuesta que diste antes, si no hay nada es que es la primera consulta: "+res;
        console.log(prompt)

        // Generamos el contenido
        const result = await model.generateContent(prompt);

        // Si result.response.text() es una Promise, necesitamos await
        const responseText = await result.response.text();
        setRes(responseText);
        console.log(JSON.parse(responseText));
        const codeJson = JSON.parse(responseText)
        setHtml_Edit(codeJson.html)
        setCss_Edit(codeJson.css)
        setJs_Edit(codeJson.js)
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

    // Función para actualizar proyecto en BD
    const subirBD = async () => {

        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('html_edit', html_edit);
            formData.append('css_edit', css_edit);
            formData.append('js_edit', js_edit);

            const response = await axios.post(
                'http://localhost/CompoDev/backend/actualizarProyecto.php',
                formData,
                { withCredentials: true }
            );

            console.log('Respuesta al guardar cambios:', response.data);

            if (response.data.status === "succes") setPopUp(true)
        } catch (error) {
            console.error('Error al guardar cambios:', error);
        }
    };

    return (
        <>
            {
                popUp ? <div
                    className='sticky w-full top-[10%] z-100'
                    onClick={() => setPopUp(false)}
                >
                    <div className='text-black text-center p-5 w-[50%] bg-white mx-auto rounded popup'>
                        <p className='font-bold'>Cambios guardados con éxito! 😎</p>
                    </div>
                </div> : null
            }
            <div className="p-2 text-white pt-18 bg-black">
                {/* Editores */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
                    {/* HTML Editor */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-1 text-white">HTML</h2>
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
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-1 text-white">CSS</h2>
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
                    <div className="bg-gradient-to-r from-amber-300 to-yellow-400 p-1 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-1 text-white">JavaScript</h2>
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
                <form
                    className='bg-gradient-to-r m-auto from-emerald-300 to-emerald-600 p-1 rounded-lg shadow w-full md:w-[60%] flex flex-col justify-center'
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-lg font-semibold mb-1 text-white">IA</h2>
                    <textarea
                        className='bg-[#282C34] w-full h-[342px] p-3'
                        value={text}
                        onChange={handleChange}
                    />
                    <input className='bg-white/50 m-auto px-3 py-2 rounded-2xl my-3 text-black' type="submit" value="Probar" />
                </form>
                {/* Vista previa */}
                <Result srcCode={srcCode} />
                {/* Botones */}
                <div className="flex justify-center mt-5">
                    <button
                        onClick={subirBD}
                        className="shiny-cta"
                    >
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    );
};

export default Ide;
