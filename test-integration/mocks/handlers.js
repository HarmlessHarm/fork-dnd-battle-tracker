// eslint-disable-next-line import/no-extraneous-dependencies
import { graphql, rest } from 'msw';

export default [
  rest.get('https://wyqoq6xpifbjlm6xq6jnqugjvm.appsync-realtime-api.eu-west-2.amazonaws.com/graphql', null),

  rest.get('https://www.dnd5eapi.co/api/monsters', (req, res, ctx) => res(
    ctx.json({
      results: [
        { index: 'goblin', name: 'Goblin', url: '/api/monsters/goblin' },
        { index: 'hobgoblin', name: 'Hobgoblin', url: '/api/monsters/hobgoblin' },
      ],
    }),
  )),

  rest.get('https://www.dnd5eapi.co/api/monsters/goblin', (req, res, ctx) => res(
    ctx.json({
      index: 'goblin',
      name: 'Goblin',
      hit_points: 7,
      hit_points_roll: '2d6',
      dexterity: 14,
      armor_class: [
        {
          type: 'armor',
          value: 15,
          armor: [
            {
              index: 'leather-armor',
              name: 'Leather Armor',
              url: '/api/equipment/leather-armor',
            },
            {
              index: 'shield',
              name: 'Shield',
              url: '/api/equipment/shield',
            },
          ],
        },
      ],
    }),
  )),

  graphql.mutation('CREATE_BATTLE', (req, res, ctx) => res(
    ctx.data({
      createDndbattletracker: {
        battleId: 'some-battle-id',
      },
    }),
  )),

  graphql.query('GET_BATTLE', (req, res, ctx) => res(
    ctx.data({
      getDndbattletracker: {
        battleId: 'some-battle-id',
        round: 0,
        creatures: [],
        activeCreature: null,
      },
    }),
  )),
];
