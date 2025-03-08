import { useState } from 'react'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import Result from '../components/ide/Result';
import './Ide.css'
import { useParams } from 'react-router-dom';

const Ide = () => {
    // Obtenemos el parámetro id de la URL: /ide/:id
    const { id } = useParams();

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

    const srcCode = `
      <body>${html_edit}</body>
      <style>${css_edit}</style>
      <script>${js_edit}</script>
    `

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
                <button className='px-3 py-2 bg-white cursor-pointer'>Añadir Proyecto</button>
            </div>
        </div>
    )
}

export default Ide