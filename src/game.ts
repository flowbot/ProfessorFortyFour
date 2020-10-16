import { ProfessorFortyFour } from '../metas/professorfortyfour/professorfortyfour'

const professorfortyfourLandOwnerData = {
  meta_data: `{
    "gardens": ["10,70","-115,-69","119,-20","-125,-67","-133,-68","-138,-124","-140,-50","140,-56","142,-59","-144,-123","144,-53","14,-86","21,-125","2,-135","21,88","24,-137","-24,-23","-24,7","28,-119","31,-65","3,-34","-35,-87","-38,-53","-39,31","4,-111","-44,-110","-48,-56","-48,-57","49,-91","5,-111","-55,-3","56,119","57,28","58,-24","60,-124","6,-111","62,29","-62,45","6,-64","-75,-63","88,29","-91,-91"],
    "nests": ["2,-119", "28,-119", "3,-34", "-48,-57", "49,-91", "-92,-88"]
  }`,
  host_data: `
  {
    "professor": {
      "position": {"x":8,"y":1,"z":8},
      "rotation": {"x":0,"y":0,"z":0},
      "scale": {"x":1,"y":1,"z":1}
    }
  }`
}

/// --- Set up your meta system to test ---
engine.addSystem(new ProfessorFortyFour(null, professorfortyfourLandOwnerData))
