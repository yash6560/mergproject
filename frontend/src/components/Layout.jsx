import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <div className="min-h-screen">
        <Navbar/>
        <main className="bg-base-200">{children}</main>
        <Footer/>
    </div>
  )
}

export default Layout