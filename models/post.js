import DS from 'react-native-data/types';

export const post = {
  id: DS.attr('number'),
  title: DS.attr('string'),
  userId: DS.attr('number'),
  users: DS.belongsTo('user', 'userId'),
  // userId: DS.belongsTo('user', 'id'),
};
