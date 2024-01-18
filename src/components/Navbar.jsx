import React from "react";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";


const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
  height: 13vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "#21252D" : "none"};
  .icon{
    display: flex;
    width:70%;
    .back-forword{
      color: #b3b3b3;
      font-size:2.5rem;
      padding:5px;
      svg{
        border-radius: 50%;
        background-color: rgba(0,0,0,0.4);
        margin:4px;padding:8px;
        font-size:2.2rem;
        &:hover{
          background-color: rgba(0,0,0,0.7);
        }
      }
    }
    .search__bar {
      margin-top:8px;
      background-color: white;
      width:50%;height:5vh;
      padding:5px 10px;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      font-size:1.2rem;
      input {
        border: none;
        height: 0.8rem;
        width: 100%;
        font-size:1rem;
        &:focus {
          outline: none;
        }
      }
    }
  }
  .profile {
    background-color: black;
    padding: 0.2rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      padding:0.2rem;
      svg {
        font-size: 1.8rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;


export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  return (
    <Container navBackground={navBackground}>
      <div className="icon">
        <div className="back-forword">
       <IoIosArrowBack title="Go back"/>
       <IoIosArrowForward title="Go forword"/>
        </div>
      <div className="search__bar">
        <FaSearch />
        <input type="text" placeholder="What do you want to listen to?" />
      </div>
      </div>
      <div className="profile">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
}
