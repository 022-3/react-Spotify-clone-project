import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";


const Container = styled.div`
  color: #b3b3b3;
  height: 100%;
  overflow: hidden;
  p{
    gap: 1rem;
    padding:0.5rem 1.3rem;
    background-color: rgba(0,0, 0, 0.2); 
    align-items: center;cursor: pointer;
    transition: 0.3s ease-in-out;
    letter-spacing:0.01rem;
    font-size:1.2rem;
    font-weight:600;
    border-radius :30px;
    margin:0.5rem;
    &:hover{
      background-color: rgba(0,0, 0, 0.4); 
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    height: 60vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar{
      overflow: auto;
      height:100%;
      width: 0.5rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
    li {
      color:white;
      padding:1rem 0.5rem;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      font-weight:600;
      &:hover {
        color: white;
        background-color: rgba(0,0,0,0.3);
        border-radius :4px;
        
      }
    }
  }
`;


export default function Playlists() {
  const [{ token , playlists}, dispatch] = useStateProvider();
  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            "Authorization": "Bearer  " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id , artists,image}) => {
        return { name , id ,artists,image};
      });
      
     dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });

      //console.log(response);
    };
    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
 
  return (
    <Container>
      <div className=""><p>All Playlists</p></div>
      <ul>
        {playlists.map(({ name, id ,artists,image }) => {
          return (
            <li key={id}  onClick={() => changeCurrentPlaylist(id,name,artists,image)}>
              {name}   
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
