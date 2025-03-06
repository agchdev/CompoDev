import { useRef, useState } from 'react'
import './CrearProyecto.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CrearProyecto = () => {

  const [categoria, setCategoria] = useState("")
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [max, setMax] = useState(0)
  const [userM, setUserM] = useState(0)

  const divBtn = useRef()

  const navigate = useNavigate();

  const selectCategoria = (e) => {
    e.preventDefault();
    
    // Convertimos HTMLCollection a un array para poder usar forEach
    Array.from(divBtn.current.children).forEach(btn => {
      if (btn.textContent !== e.target.textContent) {
        btn.classList.remove("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500");
        btn.classList.add("bg-gray-700");
      } else {
        btn.classList.remove("bg-gray-700");
        btn.classList.add("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500");
      }
    });
  };
  

  const categorias = ["Botones", "Deslizador", "Fondos", "Formularios", "Landing", "Otro"]

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descr", descripcion);
    formData.append("categoria", categoria);

    try {
      const response = await axios.post(
        "http://localhost/CompoDev/backend/createProject.php",
        formData,
        { withCredentials: true } 
      );

      console.log("Respuesta del servidor:", response.data);
      if (response.data.status === "exitoso") {
        navigate("/ide");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div className='absolute bg-gradient-to-tl from-black via-black/95 to-indigo-600/0 w-full h-screen'></div>
      <div className="min-h-screen bg-black flex justify-center items-center [background-image:linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)] [background-size:50px_50px]">
        <div className='p-5 bg-white relative z-10 rounded-3xl'>
          <form 
            className='flex flex-col gap-3'
            onSubmit={handleRegister}
            method='post'
          >
            <input
              className='px-3 py-2 border rounded-full'
              type="text"
              placeholder='Nombre...'
              onChange={(e) => {
                setUserM(e.target.value.length)
                e.target.value.length >= 15 ? e.target.classList.add("text-orange-500") : e.target.classList.remove("text-orange-500")
                e.target.value.length >= 30 ? e.target.classList.add("text-red-500") : e.target.classList.remove("text-red-500")

                setTitulo(e.target.value)
              }}
              required
            />
            <p className='text-sm'>{userM}/30</p>
            <textarea
              className='px-3 py-2 border rounded-3xl text-black'
              placeholder='Descripcion...'
              onChange={(e) => {
                setMax(e.target.value.length)
                console.log()
                e.target.value.length >= 450 ? e.target.classList.add("text-orange-500") : e.target.classList.remove("text-orange-500")
                e.target.value.length >= 500 ? e.target.classList.add("text-red-500") : e.target.classList.remove("text-red-500")

                setDescripcion(e.target.value)
              }}
              required
            />
            <p className='text-sm'>{max}/500</p>
            <p className='mt-2 text-sm text-slate-600'>Categoria*</p>
            <div ref={divBtn} className='flex justify-center flex-wrap gap-1 w-[250px] lg:w-[450px] mb-5 transition-all'>
            {categorias.map(categ => (
              <button
                key={categ}
                className='px-3 py-2 text-white bg-gray-700 cursor-pointer rounded-2xl m-0 w-auto'
                onClick={(e) => {
                  selectCategoria(e)
                  setCategoria(e.target.textContent)
                  e.preventDefault()
                  e.target.classList.add("bg-gradient-to-r","from-emerald-500","via-emerald-600","to-emerald-500")
                }}
              >{categ}</button>
            ))}
            </div>
            <button 
              className="shiny-cta"
              >
              <span>Crear Proyecto</span>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CrearProyecto