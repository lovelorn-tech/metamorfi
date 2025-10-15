import FooterComponent from "../../components/footer/Footer.component";
import HeaderComponent from "../../components/header/Header.component";
import "./main.styles.scss";
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='main-layout'>
      <div className="header-container"><HeaderComponent/></div>
      <main className="main">
        <Outlet/>
      </main>
      <FooterComponent/>
    </div>
  )
}
