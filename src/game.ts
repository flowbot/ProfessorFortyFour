import { Professor } from '../metas/professorfortyfour/professorfortyfour'

const professorfortyfourLandOwnerData = {
  host_data: `
  {
    "meta": {
      "position": {"x":8,"y":1,"z":8},
      "rotation": {"x":0,"y":0,"z":0},
      "scale": {"x":1,"y":1,"z":1}
    }
  }`
}

/// --- Set up your meta system to test ---
engine.addSystem(new Professor(null, professorfortyfourLandOwnerData))