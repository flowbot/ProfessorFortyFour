import { ModelTemplate } from '../metas/modeltemplate/modeltemplate'

const modeltemplateLandOwnerData = {
  host_data: `
  {
    "meta": {
      "position": {"x":8,"y":0.6,"z":8},
      "rotation": {"x":0,"y":0,"z":0},
      "scale": {"x":1.6,"y":1.6,"z":1.6}
    }
  }`
}

/// --- Set up your meta system to test ---
engine.addSystem(new ModelTemplate(null, modeltemplateLandOwnerData))