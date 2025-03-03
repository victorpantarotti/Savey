import type { MenuProps } from 'antd';
import { Space, Dropdown } from "antd";
import { CgMenu, CgMathPlus, CgSun, CgMoon, CgSearch } from "react-icons/cg";
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { MdLogout, MdOutlineKey } from 'react-icons/md';
import DropdownButton from './DropdownButton';

import { usePreferencesContext } from '@/hooks/usePreferencesContext';
import { useLoginContext } from '@/hooks/useLoginContext';
import { useVideosContext } from '@/hooks/useVideosContext';

import styles from "./Header.module.scss";

const Header = () => {
  const { theme, changeTheme } = usePreferencesContext();
  const { signOutUser, changePwdModalState, setChangePwdModalState } = useLoginContext();
  const { favoriteListState, setFavoriteListState, searchState, setSearchState, addVideoState, setAddVideoState } = useVideosContext();

  const items: MenuProps['items'] = [
    {
      key: 'add-video',
      label: (
        <DropdownButton icon={<CgMathPlus />} text="Adicionar vídeo" onClick={() => setAddVideoState(!addVideoState)} />
      ),
    },
    {
      key: 'favorite',
      label: (
        <DropdownButton icon={favoriteListState ? <FaHeart /> : <FaRegHeart />} text="Favoritos" onClick={() => setFavoriteListState(!favoriteListState)} />
      ),
    },
    {
      key: 'search',
      label: (
        <DropdownButton icon={<CgSearch />} text="Buscar" onClick={() => setSearchState(!searchState)} />
      ),
    },
    {
      key: 'change-theme',
      label: (
        <DropdownButton icon={ theme === "dark" ? <CgSun /> : <CgMoon /> } text="Mudar Tema" onClick={changeTheme} />
      ),
    },
    {
      key: 'user-changepwd',
      label: (
        <DropdownButton icon={<MdOutlineKey />} text="Trocar Senha" onClick={() => setChangePwdModalState({ active: !changePwdModalState.active, closable: true })} />
      ),
    },
    {
      key: 'user-logout',
      label: (
        <DropdownButton icon={<MdLogout />} text="Desconectar-se" onClick={() => signOutUser()} />
      ),
    }
  ];

  return (
    <>
      <header className={styles.header}>
        <p className={styles.savey}>Savey</p>
        <ul className={styles.menu}>
          <li className={styles.btn}>
            <Space direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottomLeft" className={`${theme}-theme`}>
                  <CgMenu size={28} fontWeight={12} />
                </Dropdown>
              </Space>
            </Space>
          </li>
          <li className={`${styles.liAddVideo} ${styles.btn}`} onClick={() => setAddVideoState(!addVideoState)}>
            <CgMathPlus size={28} />
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;