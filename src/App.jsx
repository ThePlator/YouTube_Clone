
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Maincontainer from './Pages/Maincontainer'
import VideoList from './components/VideoList'
import Watch from './components/Watch'
import VideoResult from './components/VideoResult'

const appRouter = createBrowserRouter([{
  path: '/',
  element: <Maincontainer/>,
  children:[
    {
      path:'/',
      element: <VideoList/>
    },
    {
      path:'watch',
      element: <Watch/>
    },
    {
      path:'/results',
      element: <VideoResult/>
    }
  ]
}])

function App() {


  return (
    <div className='justify-center'>
      <Header/>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
