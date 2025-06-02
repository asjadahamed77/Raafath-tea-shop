import { Route,Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Account from "./pages/Account"
import Box from "./pages/Box"
import Login from "./pages/Login"

function App() {
  

  return (
 
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element ={ <About />} />
      <Route path="contact" element ={ <Contact />} />
      <Route path="account" element ={ <Account />} />
      <Route path="box" element ={ <Box />} />
      <Route path="login" element ={ <Login />} />

      </Route>
    </Routes>
     
     
   
  )
}

export default App
