import { Dialog, NPC } from '@dcl/npc-scene-utils'


export class ProfessorFortyFour implements ISystem {
  // active gardens
  //todo get from an api
  gardens: Array<string> = []
  nests: Array<string> = []

  randomGardenTeleport() {
    //teleportTo('49,-91')
    teleportTo(this.gardens[this.gardens.length * Math.random() | 0])
  }

  randomNestTeleport() {
    //teleportTo('49,-91')
    teleportTo(this.nests[Math.floor(this.nests.length * Math.random()) | 0])
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
      buttons: [
        {
          label: "YES",
          goToDialog: 3,
          triggeredActions: () => {
            this.randomNestTeleport()
          }
        },
        { label: "NO", goToDialog: 4 }
      ],
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
      buttons: [
        { label: "YES", goToDialog: 3,
          triggeredActions: () => {
            this.randomGardenTeleport()
          }
        },
        { label: "NO", goToDialog: 6 }
      ],
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
    ///////// Your static scene assets ///////////
    // Initialize all scene entities here

    /// --- Lets spawn a 3d model ---
    this.professorModel = new NPC(
      { position: new Vector3(8, 1, 8) },
      'metas/professorfortyfour/models/alice.glb',
      () => {
         this.professorModel.talk(this.NPCTalk, 0)
      },
      {
        faceUser: true,
        darkUI: true,
        portrait: { path: 'metas/professorfortyfour/images/alice.png', height: 256, width: 256 },
        dialogSound: 'metas/professorfortyfour/sounds/alice.mp3',
        hoverText: 'CHAT',
        onlyClickTrigger: true,
      }


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
      if(meta_data.nests){
       // log("garden meta found")
        this.gardens = meta_data.gardens
      }else{
       // log("going to the backup")
        this.gardens = ["10,70","-115,-69","119,-20","-125,-67","-133,-68","-138,-124","-140,-50","140,-56","142,-59","-144,-123","144,-53","14,-86","21,-125","2,-135","21,88","24,-137","-24,-23","-24,7","28,-119","31,-65","3,-34","-35,-87","-38,-53","-39,31","4,-111","-44,-110","-48,-56","-48,-57","49,-91","5,-111","-55,-3","56,119","57,28","58,-24","60,-124","6,-111","62,29","-62,45","6,-64","-75,-63","88,29","-91,-91"]
      }
      if(meta_data.nests){
        //log("nest meta found")
        this.nests = meta_data.nests
      }else{
        //log("going to the backup")
        this.nests = ["2,-119", "49,-91", "28,-119", "3,-34", "-48,-57", "-92,-88"]
      }
      //log(this.gardens)
      //log(this.nests)

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
