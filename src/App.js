import { Outlet } from "react-router-dom" 

import TemplateDefault from "./templates/Default"

const App = () => {
  return (
    <TemplateDefault>
      <Outlet />
    </TemplateDefault>
  )
}

export default App