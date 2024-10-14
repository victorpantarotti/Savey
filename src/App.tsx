import { useEffect } from 'react';
import { useGlobalContext } from './hooks/useGlobalContext';

import { ConfigProvider } from 'antd';
import Loader from './components/Loader';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Login from './components/Login';
import Videos from './components/Videos';
import Footer from './components/Footer';

import styled from 'styled-components';

const AntDTheme = {
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
};

const AppDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--backgroundColor);
  color: var(--textColor);
  font-family: "Sora";
`;

function App() {
  const { showLoading } = useGlobalContext();

  useEffect(() => showLoading("reset"), []);

  return (
    <ConfigProvider theme={AntDTheme}>
      <AppDiv>
        <Loader />
        <Alerts />
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
