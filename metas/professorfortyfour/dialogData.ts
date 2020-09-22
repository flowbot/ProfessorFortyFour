import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'
import { Professor } from './professorfortyfour'

export let NPCTalk: Dialog[] = [
    {
      text: 'Hi there, I am Professor Forty Four! I am here to help you navigate Ethermon location in Decentraland',
    },
    {
      text: 'Would you like me to teleport you now to an Ethermon Garden location?',
      isQuestion: true,
      labelE: { label: "YES", fontSize: 14 },
      triggeredByE: () => {
        Professor.randonGardenTeleport()
      },
      ifPressE: 3,
      labelF: { label: "NO", fontSize: 14 },
      ifPressF: 2,
    },
    {
      text: 'Welp, that is all I can do right now talk to you later',
      isEndOfDialog: true,
    },
    {
      text: 'bloop bloop bloop...oh you decided not to go, ok just let me know when you are ready',
      isEndOfDialog: true,
    },
  ]