import React from "react";
import styled from "styled-components";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";


const Container = styled.div`
  align-items: center;
  justify-content: center;
  text-align:center;
  gap:0.2rem;
 .up{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size:1.3rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
      font-size:2.1rem;
      &:hover {
        color: #1db954;
      }
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2.3rem;
  }
 }
}
.down{
  display: flex;
  align-items: center;
  justify-content: center;
  
  span{
    color:white;
    padding:5px;
  }
  input {
    width: 25rem;
    border-radius: 2rem;
    height: 0.2rem;
    &:hover{
      color:#1db954;
      height:0.2rem;
    }
  }
`;

export default function PlayerControls() {
  const [{token,playerState},dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };
  
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if(response.data !== ""){
      const currentPlaying = {
        id: response.data.item.id,
        name: response.data.item.name,
        artists: response.data.item.artists.map((artist)=> artist.name),
        image: response.data.item.album.images[2].url,
      };
      dispatch({ type:reducerCases.SET_PLAYING, currentPlaying });
    }else
    dispatch({ type:reducerCases.SET_PLAYING, currentPlaying:null }); 
  }
 
  return (
    <Container>
      <div className="up">
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() =>changeTrack("previous")} />
      </div>
      <div className="state">
        {playerState ? (
          <BsFillPauseCircleFill  onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill onClick={changeState} />
        )}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() =>changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
      </div>
    <div className="down">
    <span id="currentStart">1:30</span>
      <input type="range" min="0" max="100" step="1" data-testid="playerSeekBar"  />
      <span id="currentEnd">4:10</span>
    </div>

    </Container>
  );
}

