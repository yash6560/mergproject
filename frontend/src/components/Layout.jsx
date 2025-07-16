import Footer from "./Footer"
import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar className="flex"/>
        <main className="bg-base-200 flex-1">{children}</main>
        <Footer className="flex"/>
    </div>
  )
}

export default Layout