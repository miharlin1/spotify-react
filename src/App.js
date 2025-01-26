import {HashRouter as Router, Routes, Route} from 'react-router-dom';
  //hasRouter is component to wrap entire app, create routing environemtn
  //routes can specifiy potentional routes
  //route is component we use for each ind. page
import { Home } from './Pages/Home';
import { CreatePost } from './Pages/CreatePost';
import './App.css';  // Import global styles
import { Layout } from './Layout';

function App() {
  return(
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
