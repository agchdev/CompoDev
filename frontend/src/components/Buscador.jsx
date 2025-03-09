import axios from "axios"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import OverlayProyecto from "./perfil/OverlayProyecto"


const Buscador = () => {

  const [lupaOpen, setLupaOpen] = useState(false)
  const [buscando, setBuscando] = useState("")
  const [cat, setCat] = useState('');
  const [extra, setExtra] = useState('');
  const [res, setRes] = useState([]);

  const categorias = ["Botones", "Deslizador", "Fondos", "Formularios", "Landing", "Otro"]

  const divBtn = useRef()
  const busca = useRef(null)
  const divCosas = useRef(null)
  const muchosLinks = useRef(null)
  const inpText = useRef(null)
  const inpBusca = useRef(null)
  const btnEx = useRef(null)
  const btnEx1 = useRef(null)

  const buscar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("busqueda", buscando);
    formData.append("cat", cat);
    formData.append("extra", extra);

    try {
      const response = await axios.post(
        "http://localhost/CompoDev/backend/busqueda.php",
        formData,
      )

      console.log("respuesta del servidor: ", response.data);
      setRes(response.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }


  const selectCategoria = (e) => {
    e.preventDefault();

    // Convertimos HTMLCollection a un array para poder usar forEach
    Array.from(divBtn.current.children).forEach(btn => {
      if (btn.textContent !== e.target.textContent) {
        btn.classList.remove("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500");
        btn.classList.add("bg-[#252525]");
      } else {
        btn.classList.remove("bg-gray-700");
        btn.classList.add("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500");
      }
    });
  };

  const abreBuscador = () => {
    setLupaOpen(!lupaOpen)
    if (lupaOpen) {
      busca.current.classList.add("w-[70%]", "m-auto", "py-1")
      divCosas.current.classList.add("flex-col")
      muchosLinks.current.classList.add("m-auto")
      inpText.current.classList.remove("hidden")
      inpBusca.current.classList.remove("hidden")
      inpText.current.focus()
    } else {
      busca.current.classList.remove("w-[70%]", "m-auto", "py-1")
      divCosas.current.classList.remove("flex-col")
      muchosLinks.current.classList.remove("m-auto")
      inpText.current.classList.add("hidden")
      inpBusca.current.classList.add("hidden")
    }
  }

  return (
    <>
      <div className="absolute flex justify-center items-center flex-col w-full m-auto top-40 lg:top-27 transition-all gap-4">
        <Link
          className='mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center relative z-200 w-[80%]'
          to="/search"
          ref={busca}
        >
          <img
            className='transition-all'
            src="./public/uploads/lupa.svg" alt="lupa"
            onClick={abreBuscador}
          />
          <input
            ref={inpText}
            className='w-full bg-black/70 rounded-3xl text-white transition-all px-3 py-1.5'
            type="text"
            value={buscando}
            onChange={(e) => {
              setBuscando(e.target.value)
              console.log(buscando)
            }}
          />
          <button
            className='rounded-full bg-[#1d1d1d] py-2 px-5 cursor-pointer hover:bg-black/70'
            ref={inpBusca}
            onClick={(e) => buscar(e)}
          ><img src="./public/uploads/send.svg" alt="" /></button>
        </Link>
        <div className="relative flex lg:flex-row flex-col-reverse justify-center items-center z-201 gap-0 lg:gap-10">
          <div className="flex gap-2">
            <button
              className="mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center z-200 w-[auto] cursor-pointer"
              ref={btnEx}
              onClick={() => {
                setExtra('reciente')
                console.log(extra)
                btnEx.current.classList.add("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500")
                btnEx.current.classList.remove("bg-[#252525]")
                btnEx1.current.classList.add("bg-[#252525]")
                btnEx1.current.classList.remove("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500")
              }}
            >
              <img src="./public/uploads/recent.svg" alt="" />
            </button>
            <button
              className="mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center z-200 w-[auto] cursor-pointer"
              ref={btnEx1}
              onClick={() => {
                setExtra('liked')
                console.log(extra)
                btnEx1.current.classList.add("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500")
                btnEx1.current.classList.remove("bg-[#252525]")
                btnEx.current.classList.add("bg-[#252525]")
                btnEx.current.classList.remove("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500")
              }}
            >
              <img src="./public/uploads/liked.svg" alt="" />
            </button>
          </div>
          <div ref={divBtn} className="flex flex-wrap lg:flex-nowrap w-[80%] justify-center gap-2">
            {categorias.map(categ => (
              <button
                key={categ}
                className="mt-6 lg:my-auto bg-[#252525] border-1 border-[#3a3a3a] text-gray-100 rounded-3xl py-2 px-3 flex gap-6 shadow-md transition-all items-center justify-center z-200 w-[auto] cursor-pointer"
                onClick={(e) => {
                  selectCategoria(e)
                  setCat(e.target.textContent)
                  e.preventDefault()
                  e.target.classList.add("bg-gradient-to-r", "from-emerald-500", "via-emerald-600", "to-emerald-500")
                }}
              >{categ}</button>
            ))}
          </div>
        </div>
      </div>
      <div className='absolute bg-gradient-to-tl from-black via-black/95 to-indigo-600/0 w-full'>
      <div className="min-h-screen bg-black flex justify-center items-center [background-image:linear-gradient(#333_1px,transparent_1px),linear-gradient(90deg,#333_1px,transparent_1px)] [background-size:50px_50px]">
        <div className="relative w-full flex flex-wrap justify-center mt-130 lg:mt-70 gap-4">
          {res.map(post => (
            <OverlayProyecto key={post} post={post}/>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}

export default Buscador