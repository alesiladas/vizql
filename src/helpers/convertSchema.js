const Sequelize = require('sequelize');
const { singularize } = require('inflection');

//using the .models method, traverses down to the attributes and stores all
//attribute names in an array along with the associated table

// const hasRelation = (attr) => {
//     if (attr['references']) return true;
//     return false;
// }

const convertSchemas = (schema) => {
    let schemas = [];
    let links = [];
    for (let modelKey in schema.models) {
        const model = schema.models[modelKey];
        let columnNames = [];
        for (let attribute in model.rawAttributes) {
            let dataType = model.rawAttributes[attribute]['type'].constructor.key;
            let relation = model.rawAttributes[attribute]['references'];
            if (relation) {
                if (!schema.models[relation.model]) {
                    links.push({ source: modelKey, target: singularize(relation.model) });
                } else {
                    links.push({ source: modelKey, target: relation.model })
                }
            }
            columnNames.push({ content: attribute, type: dataType, relation });
        }

        schemas.push({
            name: modelKey,
            columns: columnNames,
        });
    }
<<<<<<< HEAD
    console.log(schemas)
=======

<<<<<<< HEAD
>>>>>>> 61fe55e7edfe970e44dc9c204e129b3cb11a97d2
    return schemas;
=======
    return { schemas, links };
>>>>>>> 268380868eb1cd9a2cd1f0e1636ced5173087446
}

module.exports = convertSchemas;