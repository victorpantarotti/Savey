import { ConfigProvider } from 'antd';
import Header from './components/Header';
import Login from './components/Login';
import Videos from './components/Videos';
import Footer from './components/Footer';

import styled from 'styled-components';
import ScrollToTop from './components/ScrollToTop';

const AppDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-family: "Sora";
`;

function App() {
  return (
    <ConfigProvider theme={{
      token: {
        colorBgElevated: "var(--boxColor)",
        colorText: "var(--textColor)",
        colorTextPlaceholder: "var(--textColor)",
        colorIcon: "var(--textColor)",
        colorIconHover: "var(--textColor)",
      },
      components: {
        Input: {
          activeBg: "var(--boxColor)",
          colorBgContainer: "var(--backgroundColor)",
          colorBorder: "var(--backgroundColor)"
        }
      }
    }}>
      <AppDiv>
        <ScrollToTop />
        <Header />
        <Login />
        <Videos />
        <Footer />
      </AppDiv>
    </ConfigProvider>
  );
}

export default App;
