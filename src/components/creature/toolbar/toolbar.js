import React from 'react';
import { CreatureMenuButton, CreatureMenuToolMenu } from './tool-menus/creatureMenu';
import StatusTool from './tools/StatusTool';
import { InitiativeButton, InitiativeToolMenu } from './tool-menus/initiative';
import { ConditionsButton, ConditionsToolMenu } from './tool-menus/conditions';
import { NotesButton, NotesToolMenu } from './tool-menus/notes';
import { HpButton, HpToolMenu } from './tool-menus/hp';

export default function getToolbar() {
  return [
    {
      Button: CreatureMenuButton,
      ToolMenu: CreatureMenuToolMenu,
      ref: React.createRef(),
      key: (id) => `${id}-menu`,
    },
    {
      Button: InitiativeButton,
      ToolMenu: InitiativeToolMenu,
      ref: React.createRef(),
      key: (id) => `${id}-initiative`,
    },
    {
      Button: StatusTool,
      ref: React.createRef(),
      key: (id) => `${id}-kill`,
    },
    {
      Button: HpButton,
      ToolMenu: HpToolMenu,
      ref: React.createRef(),
      key: (id) => `${id}-hp`,
    },
    {
      Button: ConditionsButton,
      ToolMenu: ConditionsToolMenu,
      ref: React.createRef(),
      key: (id) => `${id}-conditions`,
    },
    {
      Button: NotesButton,
      ToolMenu: NotesToolMenu,
      ref: React.createRef(),
      key: (id) => `${id}-notes`,
    },
  ];
}
