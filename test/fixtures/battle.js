export default {
  creatures: [
    {
      name: 'Wellby',
      initiative: 13,
      initiativeRoll: { result: 13 },
      temporaryHealthPoints: null,
      id: 0,
      alive: true,
      conditions: [],
      notes: [],
      locked: false,
      shared: true,
      hitPointsShared: true,
      statBlock: null,
      armorClass: null,
      totalSpellSlots: null,
      usedSpellSlots: null,
    },
    {
      name: 'Goblin #1',
      initiative: 12,
      initiativeRoll: { result: 12 },
      healthPoints: 10,
      maxHealthPoints: 10,
      temporaryHealthPoints: 10,
      id: 1,
      alive: true,
      conditions: [],
      notes: [],
      locked: true,
      shared: false,
      hitPointsShared: true,
      statBlock: 'https://www.dndbeyond.com/monsters/goblin',
      armorClass: 15,
      totalSpellSlots: null,
      usedSpellSlots: null,
    },
    {
      name: 'Goblin #2',
      initiative: 12,
      initiativeRoll: { result: 12 },
      healthPoints: 10,
      maxHealthPoints: 10,
      temporaryHealthPoints: null,
      id: 2,
      alive: true,
      conditions: [],
      notes: [],
      locked: true,
      shared: true,
      hitPointsShared: true,
      statBlock: 'https://www.dndbeyond.com/monsters/goblin',
      armorClass: null,
      totalSpellSlots: null,
      usedSpellSlots: null,
    },
  ],
  creatureIdCount: 3,
  activeCreature: null,
  focusedCreature: undefined,
  round: 0,
  ariaAnnouncements: [],
  errors: [],
  createCreatureErrors: {},
  battleCreated: false,
  shareEnabled: true,
  battleId: '123',
  battleTrackerVersion: '5.0.0',
  rulesSearchOpened: false,
};
