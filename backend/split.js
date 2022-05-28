const fs = require("fs")

function stringify(object) {
  return JSON.stringify(object, null, 2)
}

const ROOT = './backend/storage'

function split(purposes) {
  Object.keys(purposes).forEach(pKey => {
    const purpose = purposes[pKey];
    fs.mkdirSync(`${ROOT}/${purpose.definition}`, { recursive: true })

    Object.keys(purpose.epics).forEach(eKey => {
      const epic = purpose.epics[eKey];
      const epicName = epic.title.replaceAll(':','')
      fs.mkdirSync(`${ROOT}/${purpose.definition}/epics/${epicName}`, { recursive: true })

      Object.keys(epic.objectives).forEach(oKey => {
        const objective = epic.objectives[oKey]
        const objectiveYear = new Date(objective.due_date).getFullYear()
        fs.mkdirSync(`${ROOT}/${purpose.definition}/epics/${epicName}/objectives/${objectiveYear}`, { recursive: true })

        Object.keys(objective.results).forEach(rKey => {
          const result = objective.results[rKey]

          result.objective_uuid = objective.uuid
          fs.mkdirSync(`${ROOT}/${purpose.definition}/epics/${epicName}/objectives/${objectiveYear}/${oKey}`, { recursive: true })
          fs.writeFileSync(`${ROOT}/${purpose.definition}/epics/${epicName}/objectives/${objectiveYear}/${oKey}/${rKey}.result.json`, stringify(result))

        })

        delete objective.results
        objective.epic_uuid = eKey
        fs.writeFileSync(`${ROOT}/${purpose.definition}/epics/${epicName}/objectives/${objectiveYear}/${oKey}.objective.json`, stringify(objective))
      })

      delete epic.objectives
      epic.purpose_uuid = pKey
      fs.writeFileSync(`${ROOT}/${purpose.definition}/epics/${epicName}/${eKey}.epic.json`, stringify(epic))
    })
    delete purpose.epics
    fs.writeFileSync(`${ROOT}/${purpose.definition}/${pKey}.purpose.json`, stringify(purpose))
  });
}

split(require('./db.json').users[0].purposes)
