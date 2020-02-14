import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

export default function NewsLetterPage() {

  return(
    <Container>
        <h3>Keep up to date with what we are doing</h3>
            <a 
                href="https://mailchi.mp/f38a195f62f3/jointheneighborhood" 
                rel="noopener noreferrer"
                target="_blank">
                    <button className="button-default">Sign up for our News Letter</button>
            </a>
    </Container>
  )
}