import React, { useState, useContext } from 'react';
import CrossIcon from '../../../../icons/CrossIcon';
import Input from '../../../../form/Input';
import { maxSpellsPerDay } from '../../../../../domain/spellcasting';
import ComboboxList from '../../../../form/ComboboxList';
import SrdContext from '../../../../app/SrdContext';

function Spell({
  spellProperty,
  spellKey,
  spell,
  id,
  creatureId,
  defaultValue,
  onSpellChange,
  useSpellMax,
  displayMaxExceeded,
}) {
  const initialValue = Number.isInteger(spell[spellProperty]) ? spell[spellProperty] : defaultValue;
  const [value, setValue] = useState(initialValue);
  const { label, total } = spell;

  const inputId = `${creatureId}-${id}-spells-${spellKey}`;

  const max = useSpellMax && Number.isInteger(total) ? total : maxSpellsPerDay;
  const maxExceeded = value >= max;
  const maxClass = displayMaxExceeded && maxExceeded ? 'spell-slot__max' : '';

  const handleChange = (event) => {
    const { value: newValue } = event.target;
    setValue(newValue);
    if (newValue !== '') onSpellChange(creatureId, spellKey, parseInt(newValue, 10));
  };

  return (
    <Input
      integer
      min="0"
      max={max}
      spinner
      value={value}
      ariaLabel={label}
      label={label}
      inputId={inputId}
      customClasses={`spell ${maxClass}`}
      handleChange={handleChange}
      disabled={max === 0}
    />
  );
}

function Spells({
  spells,
  spellProperty,
  creatureId,
  id,
  defaultValue,
  onSpellChange,
  useSpellMax,
  displayMaxExceeded,
}) {
  const spellKeys = Object.keys(spells);
  if (spellKeys.length === 0) return null;

  const renderSpell = (key) => (
    <li key={key}>
      <Spell
        spellProperty={spellProperty}
        spellKey={key}
        spell={spells[key]}
        id={id}
        creatureId={creatureId}
        defaultValue={defaultValue}
        onSpellChange={onSpellChange}
        useSpellMax={useSpellMax}
        displayMaxExceeded={displayMaxExceeded}
      />
    </li>
  );

  return (
    <ul aria-label="Spells" className="spell-list">
      {spellKeys.map(renderSpell)}
    </ul>
  );
}

function getFilteredSpells(name, spellData) {
  if (name.length < 2) return [];
  return spellData
    .filter((spell) => spell.name && spell.name.toLowerCase().includes(name.toLowerCase()))
    .map((spell) => ({
      ...spell,
      text: spell.name,
      id: spell.index,
    }));
}

export default function SpellList({
  spells,
  spellProperty,
  addSpell,
  creatureId,
  creatureName,
  id,
  defaultValue,
  onSpellChange,
  useSpellMax,
  displayMaxExceeded,
}) {
  const [name, setName] = useState('');
  const srd = useContext(SrdContext);
  const { srdSpells } = srd;
  const spellRightControls = {
    rightTitle: 'Add spell',
    RightSubmitIcon: <CrossIcon />,
  };
  return (
    <div>
      <div className="spellcasting-spell-input">
        <ComboboxList
          value={name}
          setValue={setName}
          list={getFilteredSpells(name, srdSpells)}
          id={`${creatureId}-${id}-spells`}
          dropdownId={`${creatureId}-${id}-spells-dropdown`}
          dropdownLabel="Select spell"
          label="Spells"
          listAriaLabel="Spell search results"
          inputAriaLabel={`Add spells for ${creatureName}`}
          inputAriaLabelItemSelected={`Add spells for ${creatureName}`}
          rightControls={spellRightControls}
          rightControlsItemSelected={spellRightControls}
          handleSubmit={() => addSpell(creatureId, name)}
          spellCheck={false}
        />
      </div>
      <Spells
        spells={spells}
        spellProperty={spellProperty}
        creatureId={creatureId}
        id={id}
        defaultValue={defaultValue}
        onSpellChange={onSpellChange}
        useSpellMax={useSpellMax}
        displayMaxExceeded={displayMaxExceeded}
      />
    </div>
  );
}
