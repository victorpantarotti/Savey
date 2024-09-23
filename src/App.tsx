import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import Footer from './components/Footer';

import styled from 'styled-components';

const AppDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
`;

function App() {
  return (
    <>
      <AppDiv>
        <GlobalStyle />
        <Header />
        <Footer />
      </AppDiv>
    </>
  );
}

export default App;
