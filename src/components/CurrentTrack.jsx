import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
//import {AiOutlineHeart} from 'react-icons/ai'
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
export default function CurrentTrack() {
  const [{token,currentPlaying},dispatch] = useStateProvider();
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Authorization": "Bearer " + token,
           "Content-Type": "application/json",
          },
        }
      );
     if(response.data !== "") {
      const { item } = response.data;
      const currentPlaying = {
        id: item.id,
        name:item.name,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying});
     }
       // console.log(response);
    };
    getCurrentTrack();
  }, [token, dispatch]);
 
  return (
    <Container>
      {currentPlaying && (
          <div className="track">
            <div className="track_image">
                 <img src={currentPlaying.image} alt="currentlyPlaying" />
            </div>
            <div className="track_info">
                <h4>{currentPlaying.name}</h4>
                <h6> {currentPlaying.artists.join(", ")} </h6>
            </div>
          </div>
        )}
    </Container>
  );
}

const Container = styled.div`
  padding:0 1rem;
letter-spacing:0.01rem;
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    .track_info{
      h4{
        color:white;
      }
      h6{
        font-size:0.8rem;
        color:#b3b3b3;
      }
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      color:white;
      &__track__name {
        color: white;
      }
      &__track__artists{
        color: #b3b3b3;
      }
    }
  }
`;
