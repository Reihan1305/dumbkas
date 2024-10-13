import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import route from "./router"

function App() {
  return (
    <>
      <Fragment>
        <RouterProvider router={createBrowserRouter(route)}/>
      </Fragment>
    </>
  )
}

export default App
