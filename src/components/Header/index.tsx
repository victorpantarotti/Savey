import type { MenuProps } from 'antd';
import { Space, Dropdown } from "antd";
import { CgMenu, CgMathPlus  } from "react-icons/cg";

import './Dropdown.css';
import styles from "./Header.module.css";
import { usePreferencesContext } from '@/hooks/usePreferencesContext';

const Header = () => {
  const { changeTheme } = usePreferencesContext();

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
        <h3>nothing</h3>
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
                    <Dropdown menu={{ items }} placement="bottomLeft">
                        <CgMenu size={28} fontWeight={12} />
                    </Dropdown>
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