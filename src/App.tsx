import { useEffect, useState } from 'react';
import { useGlobalContext } from './hooks/useGlobalContext';
import { useLoginContext } from './hooks/useLoginContext';
import { useVideosContext } from './hooks/useVideosContext';
import { usePreferencesContext } from './hooks/usePreferencesContext';

import firebaseConfig from './utils/initDatabase';
import { getDatabase, onValue, ref } from 'firebase/database';

import { Intent, SendIntent } from "send-intent";

import { VideosObject } from './contexts/VideosContext';

import utils from './utils';

import { ConfigProvider } from 'antd';
import Loader from './components/Loader';
import Alerts from './components/Alerts';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Login from './components/Login';
import SignIn from './components/SignIn';
import Videos from './components/Videos';
import Footer from './components/Footer';
import UserInfo from './components/UserInfo';

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

function App() {
  const { user } = useLoginContext();
  const { theme } = usePreferencesContext();
  const { loading, showLoading } = useGlobalContext();
  const { setVideos, addVideo, isVideosLoaded, setAddVideoState, setSearchState } = useVideosContext();
  const db = getDatabase(firebaseConfig);
  const [intent, setIntent] = useState<Intent>({});

  useEffect(() => showLoading("reset"), []);

  // android share
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
    if (user?.uuid) {
      const event = onValue(ref(db, user.uuid), (snap) => {
        if (snap.exists() && snap.val().videos) {
          const array = snap.val().videos;
          const sortedArray = array.sort((a: VideosObject, b: VideosObject) => a.order - b.order);
          return setVideos(sortedArray);
        }
        return setVideos([]); 
      });

      return () => event();
    }
  }, [user]);

  // theme switcher
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // add video shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) {
        switch (e.code) {
          case "Space":
            case "KeyQ":
            e.preventDefault();
            setAddVideoState((state) => !state);
            break;
            
            case "KeyK":
            e.preventDefault();
            setSearchState((state) => !state);
            break;

          default:
            break;
        }

      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ConfigProvider theme={AntDTheme}>
      <main className={`w-full min-h-screen bg-[var(--backgroundColor)] text-[var(--textColor)] font-["Sora"] ${loading.active ? "overflow-y-hidden" : "overflow-y-auto"}`}>
        <Loader />
        <Alerts />
        <ScrollToTop />
        <Header />
        <Login />
        <SignIn />
        <UserInfo />
        <Videos />
        <Footer />
      </main>
    </ConfigProvider>
  );
}

export default App;