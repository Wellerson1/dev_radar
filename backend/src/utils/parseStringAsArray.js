module.exports = function parseStringsAsArray(arrayAsString){

    return arrayAsString.split(',').map(tech => tech.trim());
}