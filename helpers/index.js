const getValidPayload = (validFields, payload) =>
Object.entries(payload).reduce(
  (acc, [key, value]) =>
    validFields.includes(key) ? { ...acc, [key]: value } : acc,
  {}
);

const FieldsFilled = (fields, payload) =>
fields.every((field) => Object.keys(payload).includes(field));

module.exports = {
getValidPayload,
FieldsFilled,
};