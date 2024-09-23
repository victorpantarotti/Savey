import Header from './components/Header';

import './App.css';
import { usePreferencesContext } from './hooks/usePreferencesContext';

function App() {
  const { theme } = usePreferencesContext();

  return (
    <div className={`app ${theme}-theme`}>
      <Header />
    </div>
  );
}

export default App;
