import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from "./Playlists";
import { IoLibrary,IoAddOutline } from "react-icons/io5";
import { FiArrowRight } from "react-icons/fi";


const Container = styled.div`
  background-color: #24242448;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 0.8rem 0;
      img {
        max-inline-size:55%;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        letter-spacing:0.01rem;
        font-size:1.1rem;
        font-weight:600;
        svg{
          font-size:1.4rem;
        }
        &:hover {
          color: white;
        }
      }
    }
  }
  .palylist{
    overflow: auto;
    &::-webkit-scrollbar{
      width: 0.7rem;
      &-thumb {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

export default function Sidebar() {
  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
          <li>
            <IoLibrary />
            <span title="Collapse your Library">Your Library</span>
            <IoAddOutline title="Add playlist"/>
            <FiArrowRight title="shows more" />
          </li>
          </li>
        </ul>
      </div>
      <div className="palylist">
      <Playlists />
      </div>
    </Container>
  );
}

