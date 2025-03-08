import { Link } from "react-router-dom"

const OverlayProyecto = ({post}) => {
  console.log(post)
  return (
    <Link to={"/ide/"+post.id_project} className="text-white flex flex-col justify-center h-full bg-[#282828] hover:bg-[#3f3f3f] m-4 p-3 rounded-2xl transition-all cursor-pointer">
      <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] bg-white rounded-xl transition-all" >
        <img className="w-full h-full object-cover" src={"http://localhost/CompoDev/backend/miniaturas/"+post.miniatura} alt="" />
      </div>
      <div className="mt-5 flex gap-2 flex-col justify-start ml-3">
        <h2>{post.titulo}</h2>
        <p>{post.descripcion_proyecto}</p>
        <p className="bg-white/70 text-black w-auto ml-0 m-auto px-2 py-1 rounded-full">{post.categoria}</p>
      </div>
    </Link>
  )
}

export default OverlayProyecto
