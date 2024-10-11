import type { MenuProps } from 'antd';
import { Space, Dropdown, ConfigProvider } from "antd";
import { CgMenu, CgMathPlus, CgSun, CgMoon, CgProfile } from "react-icons/cg";
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import DropdownButton from './DropdownButton';

import { usePreferencesContext } from '@/hooks/usePreferencesContext';
import { useVideosContext } from '@/hooks/useVideosContext';

import styles from "./Header.module.css";

const Header = () => {
  const { theme, changeTheme, setLoginModalState } = usePreferencesContext();
  const { favoriteListState, setFavoriteListState } = useVideosContext();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <DropdownButton icon={favoriteListState ? <FaHeart /> : <FaRegHeart />} text="Favoritos" onClick={() => setFavoriteListState(!favoriteListState)} />
      ),
    },
    {
      key: '2',
      label: (
        <DropdownButton icon={ theme === "dark" ? <CgSun /> : <CgMoon /> } text="Mudar Tema" onClick={changeTheme} />
      ),
    },
    {
      key: '3',
      label: (
        <DropdownButton icon={<CgProfile />} text="Mudar Usuário" onClick={() => setLoginModalState({
          active: true,
          closable: true
        })} />
      ),
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <p className={styles.savey}>Savey</p>
        <ul className={styles.menu}>
          <li>
            <Space direction="vertical">
                <Space wrap>
                  <ConfigProvider theme={{
                    token: {
                      colorBgElevated: "var(--boxColor)",
                      colorText: "var(--textColor)"
                    }
                  }}>
                    <Dropdown menu={{ items }} placement="bottomLeft" className={`${theme}-theme`}>
                        <CgMenu size={28} fontWeight={12} />
                    </Dropdown>
                  </ConfigProvider>
                </Space>
            </Space>
          </li>
          <li className={styles.liAddVideo}>
            <CgMathPlus size={28} />
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;