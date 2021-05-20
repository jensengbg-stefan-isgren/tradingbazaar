import React from 'react'
import Profile from 'components/Settings/Profile'
import Sale from 'components/Settings/Sale'
import Notifications from 'components/Settings/Notifications'
import Security from 'components/Settings/Security'
import Payments from 'components/Settings/Payments'
import Email from 'components/Settings/Email'
import SaleSettings from 'components/Settings/Sale'
import styled from 'styled-components'


const Wrapper = styled.div`
  width:100vw;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items:flex-start;
  background-color:white;
`

const SettingsContainer = styled.div`
margin-top:4em;
  height:25vh;
  width:60vw;
  text-align:center;
  display:grid;
  gap:1em;
  grid-template-columns: repeat(2,1fr);
`


const Settings = () => {
  return (
  <Wrapper>
    <SettingsContainer>
      <Profile/>
      <SaleSettings/>
      <Payments/>
      <Email/>
      <Security/>
      <Notifications/>
    </SettingsContainer>
  </Wrapper>
  )
}

export default Settings
