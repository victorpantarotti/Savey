import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Login from './components/Login';
import Footer from './components/Footer';
import { useVideosContext } from './hooks/useVideosContext';

import styled from 'styled-components';

const AppDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-family: "Sora";
`;
  
function App() {
  const { videos, changeVideosOrder } = useVideosContext();
  
  return (
    <AppDiv>
      <GlobalStyle />
      <Header />
      <button onClick={() => {
        changeVideosOrder(2, 4);
      }}>
        teste
      </button>
      {!!videos 
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
