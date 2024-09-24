import type { MenuProps } from 'antd';
import { Space, Dropdown, ConfigProvider } from "antd";
import { CgMenu, CgMathPlus, CgSun, CgMoon, CgProfile, CgHeart } from "react-icons/cg";
import { usePreferencesContext } from '@/hooks/usePreferencesContext';

import styles from "./Header.module.css";
import DropdownButton from './DropdownButton';

const Header = () => {
  const { theme, changeTheme, setLoginModalState } = usePreferencesContext();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <DropdownButton icon={<CgHeart />} text="Favoritos" onClick={() => {}} />
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