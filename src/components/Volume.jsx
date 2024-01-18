import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import {BsVolumeUpFill,BsFillDeviceSsdFill ,BsFillMusicPlayerFill} from "react-icons/bs"
import {MdLyrics} from "react-icons/md"


const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;
  .volume-icons{
    font-size:1.3rem;
    color:#CCCCCCCC;
    gap:0.5rem;
    padding:0.1rem;
    cursor:pointer;
    svg{
      margin:5px;
    }
  }
  input {
    width: 8rem;
    border-radius: 2rem;
    height: 0.2rem;
    &:hover{
      color:#1db954;
      height:0.2rem;
    }
  }
`;

export default function Volume() {
  const [{token}] = useStateProvider();
  const setVolume = async(e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume?`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  
  return (
    <Container>
     <div className="volume-icons">
    <BsFillMusicPlayerFill title="Playing now" />
    <MdLyrics title="Lyrics"/>
    <BsFillDeviceSsdFill  title="DeviceConnect"/>
      <BsVolumeUpFill />
   </div>  
    <div className="">
      <input type="range" min={0} max={100} onMouseUp={(e) => setVolume(e)} />
    </div>
    
    </Container>
  );
}

