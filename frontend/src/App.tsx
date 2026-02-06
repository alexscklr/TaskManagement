
import './App.css'
import WorkspacePage from './pages/WorkspacePage';
import WorkspaceDetailsPage from './pages/WorkspaceDetailsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './layout/Main';

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main><WorkspacePage /></Main>} />
          <Route path="/workspace/:workspaceId" element={<Main><WorkspaceDetailsPage /></Main>} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
