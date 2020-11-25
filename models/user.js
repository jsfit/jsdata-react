import DS from 'react-native-data/types';

export const user = {
  id: DS.attr('number'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  posts: DS.hasMany('post', "userId"),
};
