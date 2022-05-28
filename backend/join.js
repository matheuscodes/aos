const fs = require("fs")

function recursive(array) {
  if(array.length > 0) {
    const appended = array.map(item => {
      try{
        const subdirs = fs.readdirSync(item)
        if(subdirs.length > 0) {
          return recursive(subdirs.map(subitem => item + "/" + subitem)).flatMap(i => i)
        }
        return subdirs;
      } catch(e) {
        // console.log(e.message);
      }
      return item
    })
    return appended
  }
  return array
}


function load(file) {
  return JSON.parse(fs.readFileSync(file));
}

const files = recursive(["./backend/storage"])[0]
const purposess = files.filter(i => i.endsWith("purpose.json")).map(load)
const epicss = files.filter(i => i.endsWith("epic.json")).map(load)
const objectivess = files.filter(i => i.endsWith("objective.json")).map(load)
const resultss = files.filter(i => i.endsWith("result.json")).map(load)

const joined = {}
const epics = {}
const objectives = {}
const results = {}

purposess.forEach(purpose => {
  joined[purpose.uuid] = purpose
  joined[purpose.uuid].epics = {}
})

epicss.forEach(epic => {
  epics[epic.uuid] = epic
  joined[epic.purpose_uuid].epics[epic.uuid] = epic
  delete epic.purpose_uuid
  epic.objectives = {}
})

objectivess.forEach(objective => {
  objectives[objective.uuid] = objective
  epics[objective.epic_uuid].objectives[objective.uuid] = objective
  delete objective.epic_uuid
  objective.results = {}
})

resultss.forEach(result => {
  objectives[result.objective_uuid].results[result.uuid] = result
  delete result.objective_uuid
})

fs.writeFileSync("./db.json", JSON.stringify({
  "users": [
    {
      "id": "local",
      "purposes": joined,
    }
  ]
}, null, 2))
