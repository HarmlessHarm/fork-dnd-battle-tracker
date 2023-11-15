import React, { useRef, useState, useContext } from 'react';
import OptionsMenuIcon from '../../icons/OptionsMenuIcon';
import SaveLoadIcon from '../../icons/SaveLoadIcon';
import ShareIcon from '../../icons/ShareIcon';
import RulesSearchMenuIcon from '../../icons/RulesSearchMenuIcon';
import RemoveIcon from '../../icons/RemoveIcon';
import useNavigableList from '../../widgets/useNavigableList';
import useAutoClosable from '../../widgets/useAutoClosable';
import BattleManagerContext from '../../app/BattleManagerContext';
import { isSaveLoadSupported } from '../../../state/AppManager';

const searchRules = (onClick, rulesSearchOpen) => ({
  icon: <RulesSearchMenuIcon opened={rulesSearchOpen} />,
  label: rulesSearchOpen ? 'Close search' : 'Search rules',
  ref: React.createRef(),
  onClick,
});

const dmItems = (battleManager, shareEnabled, rulesSearchOpen, fileSelector) => {
  const menuItems1 = [
    searchRules(battleManager.toggleRulesSearch, rulesSearchOpen),
    {
      icon: <ShareIcon enabled={shareEnabled} />,
      label: shareEnabled ? 'Unshare battle' : 'Share battle',
      ref: React.createRef(),
      onClick: battleManager.toggleShare,
    },
  ];

  const saveLoadItems = isSaveLoadSupported()
    ? [
      {
        icon: <SaveLoadIcon />,
        label: 'Save battle',
        ref: React.createRef(),
        onClick: battleManager.saveBattle,
      },
      {
        icon: <SaveLoadIcon load />,
        label: 'Load battle',
        ref: React.createRef(),
        onClick: () => fileSelector.current.click(),
      },
    ]
    : [];

  const menuItems2 = [
    {
      icon: <RemoveIcon />,
      label: 'Reset battle',
      ref: React.createRef(),
      onClick: battleManager.resetBattle,
    },
  ];

  return [...menuItems1, ...saveLoadItems, ...menuItems2];
};

const playerItems = (battleManager, rulesSearchOpen) => ([
  searchRules(battleManager.toggleRulesSearch, rulesSearchOpen),
]);

export default function BattleMenu({ playerSession, shareEnabled, rulesSearchOpen }) {
  const [open, setOpen] = useState(false);
  const battleManager = useContext(BattleManagerContext);
  const parentRef = useRef(null);
  const buttonRef = useRef(null);
  const fileSelector = useRef(null);
  const items = playerSession
    ? playerItems(battleManager, rulesSearchOpen)
    : dmItems(battleManager, shareEnabled, rulesSearchOpen, fileSelector);

  const [_, setFocusedItem] = useNavigableList({
    items,
    parentRef,
    autoManageFocus: true,
    onNavigate: () => !open && setOpen(true),
  });

  const wrapperId = 'battle-menu-wrapper';
  const close = () => {
    setOpen(false);
    setFocusedItem(null);
  };
  const onEscapeToClose = () => {
    close();
    buttonRef.current.focus();
  };

  useAutoClosable({
    wrapperId,
    onClickToClose: close,
    onTabToClose: close,
    onEscapeToClose,
    onEscapeDeps: [],
  });

  const ariaExpanded = open ? 'true' : 'false';
  const menuDisplay = open ? 'block' : 'none';
  const toggle = () => setOpen(!open);
  const buttonClass = 'battle-menu--button';
  const buttonClasses = open ? `${buttonClass} ${buttonClass}__open` : buttonClass;

  const clickHandler = (onClick) => {
    setOpen(false);
    onClick();
  };

  const handleUpload = () => {
    const file = fileSelector.current.files[0];
    battleManager.loadBattle(file);
  };

  return (
    <div ref={parentRef} id={wrapperId}>
      <button
        type="button"
        aria-label="Battle Menu"
        title="Battle Menu"
        aria-expanded={ariaExpanded}
        aria-haspopup="true"
        aria-controls="battle-menu"
        id="battle-menu-button"
        onClick={toggle}
        className={buttonClasses}
        ref={buttonRef}
      >
        <OptionsMenuIcon />
      </button>
      <ul
        id="battle-menu"
        role="menu"
        aria-labelledby="battle-menu-button"
        style={{ display: menuDisplay }}
        className="battle-menu"
      >
        {items.map(({
          icon,
          label,
          ref,
          onClick,
        }, i) => (
          <li
            ref={ref}
            key={label}
            role="menuitem"
            className="battle-menu--item"
            tabIndex="-1"
            onFocus={() => setFocusedItem(i)}
            onClick={() => clickHandler(onClick)}
            onKeyDown={({ code }) => code === 'Enter' && clickHandler(onClick)}
          >
            {icon}
            {label}
          </li>
        ))}
      </ul>
      <input
        data-testid="load-battle"
        type="file"
        className="hidden"
        accept="application/json"
        ref={fileSelector}
        onChange={handleUpload}
        value=""
      />
    </div>
  );
}
