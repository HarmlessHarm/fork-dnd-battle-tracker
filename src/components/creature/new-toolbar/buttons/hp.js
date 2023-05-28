import React from 'react';
import HpIcon from '../../../icons/AddHpIcon';
import HealthPointsTool from '../../toolbar/HealthPointsTool';

export function HpToolMenu({
  creature,
  creatureManagement,
}) {
  const {
    healthPoints,
    maxHealthPoints,
    temporaryHealthPoints,
    id,
    name,
  } = creature;
  const { damageCreature, healCreature } = creatureManagement;
  return (
    <div className="new-creature-toolbar">
      <HealthPointsTool
        name={name}
        id={id}
        healthPoints={healthPoints}
        maxHealthPoints={maxHealthPoints}
        temporaryHealthPoints={temporaryHealthPoints}
        damageCreature={damageCreature}
        healCreature={healCreature}
        showIfNoHp
      />
    </div>
  );
}

export function HpButton({
  onFocus,
  onClick,
  tabIndex,
  buttonRef,
}) {
  const toolbarClass = 'new-creature-toolbar';
  const buttonClass = `${toolbarClass}-button`;
  return (
    <button
      title="HP"
      className={buttonClass}
      type="button"
      ref={buttonRef}
      onFocus={onFocus}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <HpIcon />
    </button>
  );
}
