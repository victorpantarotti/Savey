import type { MenuProps } from 'antd';
import { Space, Dropdown, ConfigProvider } from "antd";
import { CgMenu, CgMathPlus  } from "react-icons/cg";
import { usePreferencesContext } from '@/hooks/usePreferencesContext';

import styles from "./Header.module.css";

const Header = () => {
  const { theme, changeTheme } = usePreferencesContext();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a onClick={(e) => {
          e.preventDefault();
          changeTheme();
        }}>
          Mudar tema
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={(e) => {
          e.preventDefault();
          changeTheme();
        }}>
          Trocar usuário
        </a>
      ),
    }
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
                      colorBgElevated: "var(--backgroundColor)",
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
          <li>
            <CgMathPlus size={28} />
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;