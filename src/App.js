import React, { useState } from 'react'
import { PlayerProvider } from "./store/PlayerContext";
import Header from "./layout/Header/Header";
import PlayerList from "./layout/Body/PlayerList";
import BottomBar from './layout/BottomNav/BottomBar'
import RightDrawer from './layout/HOCs/RightDrawer'
import NewModal from './layout/HOCs/NewModal';

import "./App.css";


function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  
  const handleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen)
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <PlayerProvider>
      <div className="App">
        <RightDrawer isOpen = { drawerOpen } openToggle={ handleDrawerOpen }/>
        <NewModal isOpen = {modalOpen} openToggle={ handleModalOpen }/>
        <Header openToggle={ handleDrawerOpen } isOpen={ drawerOpen } />
        <PlayerList modalOpen={modalOpen}/>
        <BottomBar newName={handleModalOpen} modalOpen={ modalOpen }/>
      </div>
    </PlayerProvider>
  );
}

export default App;
