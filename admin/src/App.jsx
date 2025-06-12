import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import DashBoardLayout from "./layout/DashBoardLayout"
import CakeItems from "./pages/CakeItems"
import BoxItems from "./pages/BoxItems"
import CardTypes from "./pages/CardTypes"
import Orders from "./pages/Orders"
import Users from "./pages/Users"


// Auth protection
const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  if (!adminToken) return <Navigate to="/login" replace />;
  return children;
}

function App() {
  

  return (
    <>
     <div>
    <Routes>
        {/* Public */}
        <Route path="login" element={<Login />} />
         {/* Protected Routes with layout */}
         <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CakeItems />} />
          <Route path="box-items" element = { <BoxItems /> } />
          <Route path="card-types" element = { <CardTypes /> } />
          <Route path="orders" element = { <Orders /> } />
          <Route path="users" element = { <Users /> } />
        </Route>
    </Routes>
     </div>
    </>
  )
}

export default App
