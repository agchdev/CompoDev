import AjustesProfile from "../components/perfil/AjustesProfile"
import BannerProfile from "../components/perfil/BannerProfile"
import ProyectosDelPerfil from "../components/perfil/ProyectosDelPerfil"

const Perfil = ({user}) => {
  return (
    <>
        <div className="w-full h-screen grid grid-cols-6 grid-rows-6 gap-4">
            <AjustesProfile/>
            <BannerProfile/>
            <ProyectosDelPerfil/>
        </div>
    </>
  )
}

export default Perfil
