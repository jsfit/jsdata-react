const attr = (key) => {
  return {
    type: key,
  };
};
const belongsTo = (key, id) => {
  return {
    relations: {
      belongsTo: {
        [key]: {
          foreignKey: id || key + '_id',
          localField: '',
        },
      },
    },
  };
};
const hasMany = (key, id) => {
  return {
    relations: {
      hasMany: {
        [key]: {
          foreignKey: id || key + '_id',
          localField: '',
        },
      },
    },
  };
};
export default {attr, belongsTo, hasMany};
