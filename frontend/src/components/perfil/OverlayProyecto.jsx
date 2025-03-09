import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const OverlayProyecto = ({post}) => {

  const [urlFoto, setUrlFoto] = useState('')
  
  useEffect(() => {
    setUrlFoto("http://localhost/CompoDev/backend" + post.miniatura)
  }, [post])
  

  console.log(post)
  return (
    <Link to={"/ide/"+post.id_project} className="text-white flex flex-col justify-center bg-[#282828] hover:bg-[#3f3f3f] m-4 p-3 rounded-2xl transition-all cursor-pointer my-auto h-auto w-[280px] md:w-[340px] lg:w-[390px]">
      <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] bg-white/20 rounded-xl transition-all" >
        <p className="absolute bottom-2 left-2 bg-blue-400 text-white w-auto ml-0 m-auto px-2 py-1 rounded-full">{post.categoria}</p>
        <img className="w-full h-full object-cover" src={urlFoto} alt="" />
      </div>
      <div className="mt-5 flex gap-2 flex-col justify-start ml-3">
        <h2 className="font-bold text-md">{post.titulo}</h2>
        <p>{post.descripcion_proyecto}</p>
      </div>
    </Link>
  )
}

export default OverlayProyecto
