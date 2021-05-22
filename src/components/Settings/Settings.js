import React from "react";
import {Link} from 'react-router-dom'
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
`;

const SettingsContainer = styled.div`
  margin-top: 4em;
  height: 25vh;
  width: 60vw;
  text-align: center;
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(2, 1fr);

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(5vh, 1fr);
  }
`;

export const ItemContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  border: 1px solid grey;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 1em;
  cursor: pointer;

  h3 {
    font-size: 1em;
    font-family: ${(props) => props.theme.font.body};
  }
`;

const Settings = () => {
  return (
    <Wrapper>
      <SettingsContainer>
        <Link to="/profile/settings/account">
        <ItemContainer>
          <h3>Profile settings</h3>
        </ItemContainer>
        </Link>
    
        <ItemContainer>
          <h3>Sales settings</h3>
        </ItemContainer>
        <ItemContainer>
          <h3>email</h3>
        </ItemContainer>
        <ItemContainer>
          <h3>Notifications</h3>
        </ItemContainer>
        <ItemContainer>
          <h3>Security</h3>
        </ItemContainer>
        <ItemContainer>
          <h3>Payments</h3>
        </ItemContainer>
      </SettingsContainer>
    </Wrapper>
  );
};

export default Settings;
