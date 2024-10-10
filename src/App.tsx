import Header from './components/Header';
import Login from './components/Login';
import Videos from './components/Videos';
import Footer from './components/Footer';

import styled from 'styled-components';

const AppDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-family: "Sora";
`;

function App() {
  return (
    <AppDiv>
      <Header />
      <Login />
      <Videos />
      <Footer />
    </AppDiv>
  );
}

export default App;
