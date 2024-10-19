import { useEffect, useState } from 'react';
import { useGlobalContext } from './hooks/useGlobalContext';
import { useVideosContext } from './hooks/useVideosContext';
import { usePreferencesContext } from './hooks/usePreferencesContext';
import firebaseConfig from './utils/initDatabase';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Intent, SendIntent } from "send-intent";
import utils from './utils';

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
  const { user } = usePreferencesContext();
  const { showLoading } = useGlobalContext();
  const { setVideos, addVideo, isVideosLoaded } = useVideosContext();
  const db = getDatabase(firebaseConfig);
  const [intent, setIntent] = useState<Intent>({});

  useEffect(() => showLoading("reset"), []);

  SendIntent.checkSendIntentReceived().then((result) => {
    if (result && result.url) {
      const { valid } = utils.isYoutubeURL(result.url);

      if (valid) return setIntent(result);
      return SendIntent.finish();
    }
    return;
  }).catch(err => console.error(err));

  useEffect(() => {
    if (isVideosLoaded && Object.keys(intent).length !== 0) {
      const { id, lastTime } = utils.isYoutubeURL(intent.url!);
      return addVideo(id, lastTime, true);
    }
  }, [isVideosLoaded]);

  // realtime DB update
  useEffect(() => {
    if (user) {
      const event = onValue(ref(db, user), (snap) => {
        if (snap.exists()) {
          const array = utils.objectToArray(snap.val());
          const sortedArray = array.sort((a, b) => a.order - b.order);
          return setVideos(sortedArray);
        }
        return setVideos([]); 
      });

      return () => event();
    }
  }, [user]);

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
