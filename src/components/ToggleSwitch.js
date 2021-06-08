import React,{useRef,useState,useEffect} from 'react'
import styled from 'styled-components'
import {toggleTheme} from 'features/themeSlice'
import {useDispatch,useSelector} from 'react-redux'

const SwitchWrapper = styled.div`

.theme-switch-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width:200px;

  em {
    margin-left: 10px;
    font-size: 1.4em;
  }
}
.theme-switch {
  display: inline-block;
  height: 25px;
  position: relative;
  width: 53px;
}

.logo-title {
  ${({theme}) => theme.font.title};
}

.theme-switch input {
  display:none;
}

.slider {
  background-color: ${({theme}) => theme.toggleSwitch.background};
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: .4s;
}

.slider:before {
  background-color: ${({theme}) => theme.toggleSwitch.switch};
  bottom: 3px;
  content: "";
  height: 20px;
  left: 4px;
  position: absolute;
  transition: .4s;
  width: 20px;
}

input:checked + .slider {
  background-color: ${({theme}) => theme.toggleSwitch.background};
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

`


const ToggleSwitch = () => {
  
const {themeMode} = useSelector(state => state.theme)
const [checked,setChecked] = useState()

useEffect(() => {
  if(themeMode === 'dark') {
    setChecked(true)
  } else {
    setChecked(false)
  }
  return () => {
  
  }
}, [themeMode])



const dispatch = useDispatch()
const toggle = useRef()


const toggleMode = () => {
  dispatch((toggleTheme(themeMode)))
}



  return (
    <SwitchWrapper>
          <div className="theme-switch-wrapper">
    <label className="theme-switch" htmlFor="checkbox">
        <input onChange={toggleMode} value={checked} ref={toggle} type="checkbox" id="checkbox" />
        <div className="slider round"></div>
  </label>
  {!checked ? <em>To the darkside</em> : <em>Light it up</em>}
</div>
    </SwitchWrapper>

  )
}



export default ToggleSwitch
