import React, { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = (props) => {
  const [ players, setPlayers ] = useState({
    current: [],
    inLine: [],
    locked: [],
    total: 6,
  })

  return (
    <PlayerContext.Provider value={[players, setPlayers]}>
      {props.children}
    </PlayerContext.Provider>
  );
};

//{name: 'Steven', locked: false}, {name: 'Dave', locked: false}