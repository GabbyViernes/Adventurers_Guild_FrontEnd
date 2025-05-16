import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Mainpage';
import LoginPage from './pages/Loginpage';
import SignupPage from './pages/Signuppage';
import MainPageSI from './pages/MainpageSI';
import ProfilePage from './pages/Profilepage';
import PartyPage from './pages/Partypage';
import QuestsPage from './pages/Questspage';
import CreatePartyPage from './pages/CreatePartyPage';
import VaultPage from './pages/Vaultpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/MainSI" element={<MainPageSI />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/party" element={<PartyPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/createparty" element={<CreatePartyPage/>} />
        <Route path="/vault" element={<VaultPage/>} />
      </Routes>
    </Router>
  );
}

export default App;