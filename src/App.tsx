import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';

import { useVideosContext } from './hooks/useVideosContext';

import styled from 'styled-components';
import Alert from './components/Alert';
import { useGlobalContext } from './hooks/useGlobalContext';
import { useEffect } from 'react';

const AppDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-family: "Sora";
`;

function App() {
  const { videos } = useVideosContext();
  const { alertState } = useGlobalContext();

  useEffect(() => {

  }, [alertState]);

  return (
    <AppDiv>
      <Header />
      {/* {alertState.isThereAnAlert ? <Alert type="fail" message="Digite uma URL válida!" time="30s" /> : ""} */}
      {videos.length > 0 
        ? videos.map((video) => {
          return <p>{video.channel} | {video.order}</p>
        })
        : <p>tu n tem video n</p>
      }
      <Login />
      <Footer />
    </AppDiv>
  );
}

export default App;
