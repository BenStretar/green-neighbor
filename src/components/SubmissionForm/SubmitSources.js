import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import EnergyBar from '../EnergyBar/EnergyBar';

const Container = styled.div`
  h2 {
    text-align: center;
  }
`;

const SourceBox = styled.div`
  max-width: 120px;
  width: 100%;
  margin: 50px auto;
`;

const SourceItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  input[type="number"] {
    text-align: right;
    width: 32px;
  }
  margin: 8px 0;
`;

const EnergyBox = styled.div`
  width: 90%;
  height: 32px;
  margin: 0 auto;
  border-radius: 32px;
  overflow: hidden;
  margin-top: 50px;
`;

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


export default function SubmitSources() {

  const [sourceList, setSourceList] = useState([
    {name: 'wind', value: 0, active: false},
    {name: 'solar', value: .2, active: false},
    {name: 'bio', value: 0, active: false},
    {name: 'hydro', value: 0, active: false},
    {name: 'geo', value: 0, active: false},
  ]);

  const dispatch = useDispatch();
  const sources = {
    wind: sourceList[0].value,
    solar: sourceList[1].value,
    bio: sourceList[2].value,
    hydro: sourceList[3].value,
    geo: sourceList[4].value,
    other: Math.max(Number( (1-sumSources()).toFixed(2)), 0)
  }
  useEffect(()=>{
    dispatch({type: 'UPDATE_SUBMISSION_FORM', payload: sources})
  },[dispatch, sourceList]);

  

  function changeSourceList(index, target, value) {
    let copy = [...sourceList];
    copy[index][target] = value;
    setSourceList(copy);
  }

  function sumSources() {
    let sum = 0;
    for (let i=0; i<sourceList.length; i++) {
      sum += sourceList[i].value;
    }
    return Number(sum.toFixed(2));
  }

  function renderSources() {
    return sourceList.map( (item,i)=>{
      return (
        <SourceItem key={i}>
          <label>{capitalize(item.name)}</label>
          <input 
            type="number" 
            value={ Math.round(sourceList[i].value*100) }  
            onChange={event=>changeSourceList(i,'value', Number( (event.target.value/100).toFixed(2)) )} 
            onBlur={event=> changeSourceList(i,'value', Number(((event.target.value/100)-Math.max(0,sumSources()-1)).toFixed(2)) )}/>
          <label>%</label>
        </SourceItem>
      )
    });
  }


  return (
    <Container>
      <h2>Sources</h2>
      <EnergyBox>
        <EnergyBar sourceList={sourceList} key={Math.random} program={{
          wind: sourceList[0].value,
          solar: sourceList[1].value,
          bio: sourceList[2].value,
          hydro: sourceList[3].value,
          geo: sourceList[4].value,
          other: Math.max(Number( (1-sumSources()).toFixed(2)), 0)
          }}/>
      </EnergyBox>
      <SourceBox>
        {renderSources()}
      </SourceBox>
    </Container>
  )
}