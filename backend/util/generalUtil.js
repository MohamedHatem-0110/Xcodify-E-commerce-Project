const { sign, verify } = require('jsonwebtoken');
const { matchesStructure } = require('validate-structure');

async function encodeToken(data) {
  return await sign(data, process.env.JSON_TOKEN_SECRET);
}

async function decodeToken(token) {
  return await verify(token, process.env.JSON_TOKEN_SECRET);
}

async function validObject(original, clone) {
  const res = await matchesStructure(clone, original, true);
  return res;
}

function generateObjectFromSchemaPaths(paths) {
  const obj = {};

  for (const key in paths) {
    if (key === '_id' || key === '__v') continue;
    const path = paths[key];
    // Check the instance type of the path
    const extraKey = path.instance == 'Array' ? '[.]' : '';
    const pathRequired = path.isRequired
      ? key + extraKey
      : key + extraKey + '?';
    switch (path.instance) {
      case 'ObjectId':
      case 'String':
        obj[pathRequired] = 'string';
        break;
      case 'Number':
        obj[pathRequired] = 'number';
        break;
      case 'Boolean':
        obj[pathRequired] = 'boolean';
        break;
      case 'Date':
        obj[pathRequired] = 'string';
        break;
      case 'Array':
        // If it's an array, check if it has a single nested schema
        if (path.schema) {
          // Generate object recursively for nested schema
          obj[pathRequired] = [
            generateObjectFromSchemaPaths(path.schema.paths),
          ];
        } else {
          obj[pathRequired] = 'array';
        }
        break;
      default:
        obj[pathRequired] = 'any'; // For unsupported types, default to 'any'
    }
  }

  return obj;
}

module.exports = {
  encodeToken: encodeToken,
  decodeToken: decodeToken,
  validObject: validObject,
  generateObjectFromSchemaPaths: generateObjectFromSchemaPaths,
};
