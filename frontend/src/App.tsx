
import './App.css'
import WorkspacePage from './pages/WorkspacePage';
import WorkspaceDetailsPage from './pages/WorkspaceDetailsPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './layout/Main';
import UserPage from './pages/UserPage';
import Header from './layout/Header';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useAuthContext } from './features/auth/context/AuthContext';

function App() {
  const { user } = useAuthContext();


  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={user ? <Main><WorkspacePage /><UserPage /></Main> : <Main><LoginPage /></Main>} />
          <Route path="/signup" element={<Main><SignUpPage /></Main>} />
          <Route path="/login" element={<Main><LoginPage /></Main>} />
          <Route path="/workspace/:workspaceId" element={<Main><WorkspaceDetailsPage /></Main>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
