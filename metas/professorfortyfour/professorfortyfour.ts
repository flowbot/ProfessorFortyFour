import * as ui from '../../node_modules/@dcl/ui-utils/uiDialog/index'
import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'


export class ProfessorFortyFour implements ISystem {
  // active gardens
  //todo get from an api
  gardens: Array<string> = []
  nests: Array<string> = []

  randomGardenTeleport() {
    teleportTo(this.gardens[this.gardens.length * Math.random() | 0])
  }

  randomNestTeleport() {
    teleportTo(this.nests[this.nests.length * Math.random() | 0])
  }

  NPCTalk: Dialog[] = [
    {
      text: 'Hi there, I am Professor Forty Four! I am here to help you navigate Ethermon locations in Decentraland.',
    },
    {
      text: 'Have you seen an Ethermon Egg Nest yet? You can buy an Egg and hatch it into an Ethermon to take care of in Decentraland.',
    },
    {
      text: 'Would you like me to teleport you to an Egg Nest location?',
      isQuestion: true,
      labelE: { label: "YES", fontSize: 14 },
      triggeredByE: () => {
        this.randomNestTeleport()
      },
      ifPressE: 3,
      labelF: { label: "NO", fontSize: 14 },
      ifPressF: 4,
    },
    {
      text: 'bloop bloop bloop...oh you decided not to teleport? I am here if you change your mind.',
      isEndOfDialog: true,
    },
    {
      text: 'You can take care of your Ethermon at Garden locations. You can feed them to cure their hunger and restore their energy.',
    },
    {
      text: 'Would you like me to teleport you to a Garden location?',
      isQuestion: true,
      labelE: { label: "YES", fontSize: 14 },
      triggeredByE: () => {
        this.randomGardenTeleport()
      },
      ifPressE: 3,
      labelF: { label: "NO", fontSize: 14 },
      ifPressF: 6,
    },
    
    {
      text: 'Not ready to teleport yet? Just come back when you are ready to move to another location.',
      isEndOfDialog: true,
    },
  ]

  META_ID = 270 // Change to your MetaZone meta number identifier

  api = null
  host = null

  /// --- Lets make a 3D model ---
  professorModel = null

  /**
   * Initial scene setup, create all objects in the constructor.
   *
   * @param api          Used to call MetaZone API endpoints.
   * @param host_data    Very first
   */
  constructor(api, host_data) {
    // Save api
    this.api = api;

    let dialogWindow = new ui.DialogWindow()

    ///////// Your static scene assets ///////////
    // Initialize all scene entities here

    /// --- Lets spawn a 3d model ---
    this.professorModel = new Entity()
    this.professorModel.addComponent(new GLTFShape('metas/professorfortyfour/models/alice.glb'))
    this.professorModel.addComponent(new Transform({
      position: new Vector3(8, 1, 8)
    }))
    this.professorModel.addComponent(
      new OnPointerDown(
        e =>{
          if (!dialogWindow.isDialogOpen){
            dialogWindow.openDialogWindow(this.NPCTalk, 0)
          }
        },
        {
          button: ActionButton.POINTER,
          hoverText: 'Talk'
        }
      )
    )
    const ringsModel = new Entity()
    ringsModel.addComponent(new GLTFShape('metas/professorfortyfour/models/rings.glb'))
    ringsModel.addComponent(
      new Transform({
        position: new Vector3(0, -0.65, 0),
      })
    )
    ringsModel.setParent(this.professorModel)
    engine.addEntity(this.professorModel)

     ///////// Your static scene assets ///////////

    // Initial host data
    this.refreshHost(host_data)
  }

  /**
   * A Decentraland provided function where you should put your code that
   * repeats over and over.
   *
   * @param dt     Delta time since last update
   */
  update(dt: number) {
    // Note: your code that repeats goes here
    const dummyTarget = new Entity()
    dummyTarget.addComponent(new PlaneShape())
    dummyTarget.addComponent(new Transform())
    addFaceUserSystem(dummyTarget)

    // Track user's position
    dummyTarget.getComponent(Transform).position = this.professorModel
    .getComponent(Transform).position
    if (!this.professorModel.hasComponent(TrackUserSlerp))
    this.professorModel.addComponent(new TrackUserSlerp())
  }

  /**
   * A MetaZone provided function that contains data customized by the
   * landowner on the MetaZone.io system. This gets called every minute when it
   * is deployed live. During testing its called once in the game.ts file.
   *
   * @param host_data    Data sent from the MetaZone backend to update your Meta
   */
  refreshHost(host: Object) {
    // Save host info
    this.host = host

    if(this.host.meta_data) {
      let meta_data = JSON.parse(this.host.meta_data)
      this.gardens = meta_data.gardens
      this.nests = meta_data.nests
    }

    // Parse metadata
    if(this.host.host_data) {
      let host_data = JSON.parse(this.host.host_data)

      ///////// Your landowner adjustable content ///////////
      // You decide which of your creation's entities the landowner can adjust.

      /// --- Lets adjust our 3d model ---
      this.professorModel.getComponent(Transform).position.set(
        host_data.professor.position.x,
        host_data.professor.position.y,
        host_data.professor.position.z
      )
      this.professorModel.getComponent(Transform).rotation.setEuler(
        host_data.professor.rotation.x,
        host_data.professor.rotation.y,
        host_data.professor.rotation.z
      )
      this.professorModel.getComponent(Transform).scale.set(
        host_data.professor.scale.x,
        host_data.professor.scale.y,
        host_data.professor.scale.z
      )

      ///////// Your landowner adjustable content ///////////
    }
  }

}

@Component("trackUserSlerp")
class TrackUserSlerp {
  fraction: number = 0
}

let currentCameraPosition = new Vector3()

// Rotates robot to face the user during interaction
export function addFaceUserSystem(dummyTarget: Entity) {
  class FaceUserSystem implements ISystem {
    private robotGroup: ComponentGroup = engine.getComponentGroup(
      TrackUserSlerp
    )

    update(dt: number) {
      for (let robot of this.robotGroup.entities) {
        let transform = robot.getComponent(Transform)
        let trackUserSlerp = robot.getComponent(TrackUserSlerp)

        // Check if player moves
        if(!currentCameraPosition.equals(Camera.instance.position)) {
          // Update current camera position
          currentCameraPosition.copyFrom(Camera.instance.position)
          trackUserSlerp.fraction = 0
        }

        dummyTarget.getComponent(Transform).lookAt(Camera.instance.position)

        trackUserSlerp.fraction += dt / 12

        if (trackUserSlerp.fraction < 1) {
          transform.rotation = Quaternion.Slerp(
            robot.getComponent(Transform).rotation,
            dummyTarget.getComponent(Transform).rotation,
            trackUserSlerp.fraction
          )
        }
      }
    }
  }

  engine.addSystem(new FaceUserSystem())
}
