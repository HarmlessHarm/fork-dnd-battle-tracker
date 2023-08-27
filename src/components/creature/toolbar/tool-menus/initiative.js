import React from 'react';
import InitiativeIcon from '../../../icons/InitiativeIcon';
import InitiativeTool from '../tools/InitiativeTool';

export function InitiativeToolMenu({
  creature,
  creatureManagement,
}) {
  const { name, id, initiative } = creature;
  const { addInitiativeToCreature } = creatureManagement;
  return (
    <div className="creature-toolbar--grid creature-toolbar--entrance">
      <InitiativeTool
        name={name}
        id={id}
        initiative={initiative}
        addInitiativeToCreature={addInitiativeToCreature}
        showIfNoInitiative
      />
    </div>
  );
}

export function InitiativeButton({
  creature,
  onFocus,
  onClick,
  tabIndex,
  buttonRef,
  focused,
  closeToolMenu,
  toolMenuId,
  toolMenuExpanded,
}) {
  const { initiative } = creature;
  const enabled = initiative === undefined || initiative === null;
  const ariaDisabled = enabled ? 'false' : 'true';
  const toolbarClass = 'new-creature-toolbar';
  const buttonClass = `${toolbarClass}-button`;
  const textButtonClass = `${buttonClass} ${buttonClass}__text`;
  const mediumButtonClass = `${buttonClass}__medium`;
  const focusedButtonClass = focused ? `${buttonClass}__focused` : '';

  const initiativeOnClick = () => {
    if (enabled) {
      onClick();
    } else {
      closeToolMenu();
    }
  };

  return (
    <button
      aria-disabled={ariaDisabled}
      className={`${textButtonClass} ${mediumButtonClass} ${focusedButtonClass}`}
      type="button"
      ref={buttonRef}
      onFocus={onFocus}
      onClick={initiativeOnClick}
      tabIndex={tabIndex}
      aria-haspopup="true"
      aria-controls={toolMenuId}
      aria-expanded={toolMenuExpanded}
    >
      <InitiativeIcon />
      Initiative
    </button>
  );
}
