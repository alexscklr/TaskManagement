
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
import InvitationPage from './pages/InvitationPage';

function App() {
  const { user } = useAuthContext();


  return (
    <>
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>

            <Route path="/" element={user ? <><WorkspacePage /><UserPage /></> : <LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/workspace/:workspaceId" element={<WorkspaceDetailsPage />} />
            <Route path="/invitations" element={<InvitationPage />} />

          </Routes>
        </Main>
      </BrowserRouter>
    </>
  )
}

export default App
