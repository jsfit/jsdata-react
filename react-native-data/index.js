import {DataStore, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http';

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  // Our API sits behind the /api path
  basePath: 'https://devamjad.herokuapp.com/',
});

store.registerAdapter('http', httpAdapter, {default: true});

// // const runDemo = async function () {
// //   let user = await store.find('user', 1);
// //   user = await store.update('user', user.id, {name: 'Johnny'});
// //   await store.destroy('user', user.id);
// // };

// const user = new Schema({
//   title: 'User', // optional
//   description: 'Schema for User records', // optional
//   type: 'object',
//   properties: {
//     id: {type: 'number'},
//     name: {type: 'string'},
//   },
// });

// store.defineMapper('user', {
//   // Our API endpoints use plural form in the path
//   endpoint: 'users',
//   schema: user,
//   beforeFind: function (id, opts) {
//     console.log('yes');
//   },
//   afterFind: function (id, opts) {
//     // console.log(id);
//   },
//   //   relations: relations.user,
//   //   getLoggedInUser() {
//   //     if (this.loggedInUser) {
//   //       return utils.resolve(this.loggedInUser);
//   //     }
//   //     return store
//   //       .getAdapter('http')
//   //       .GET('/api/users/loggedInUser')
//   //       .then((response) => {
//   //         const user = (this.loggedInUser = response.data);
//   //         if (user) {
//   //           this.loggedInUser = store.add('user', user);
//   //         }
//   //         return this.loggedInUser;
//   //       });
//   //   },
// });

// global.store = store;

// import {Text, AppRegistry} from 'react-native';

// const App = (props) => (
//   <View>
//     <Text>App1</Text>
//   </View>
// );
// console.log('App registered');
// AppRegistry.registerComponent('Appname', () => App);

import * as Models from 'react-native-data/models';
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Object.entries(Models).forEach((m) => {
  let modelName = typeof m[0] === 'string' ? m[0] : m[1];
  let schema = {
    title: modelName.capitalize(),
    type: 'object',
    properties: {
      id: {type: 'number'},
    },
    relations: {
      hasMany: {},
      belongsTo: {},
    },
  };
  let relationsBetween = {
    hasMany: {},
    belongsTo: {},
  };
  m.forEach((model) => {
    if (typeof model === 'object') {
      for (_model in model) {
        if (model !== 'id') {
          if (!model[_model].hasOwnProperty('relations')) {
            schema.properties[_model] = model[_model];
          } else {
            let isHasMany = model[_model].relations.hasOwnProperty('hasMany');
            let isBelongTo = model[_model].relations.hasOwnProperty(
              'belongsTo',
            );
            if (isHasMany) {
              let relation = model[_model].relations.hasMany;
              for (_r in relation) {
                if (relation[_r]) {
                  relation[_r].localField = _model;
                }
              }
              relationsBetween = {
                ...relationsBetween,
                hasMany: {
                  ...relationsBetween.hasMany,
                  ...relation,
                },
              };
            } else if (isBelongTo) {
              let relation = model[_model].relations.belongsTo;
              for (_r in relation) {
                if (relation[_r]) {
                  relation[_r].localField = _model;
                }
              }
              relationsBetween = {
                ...relationsBetween,
                belongsTo: {
                  ...relationsBetween.belongsTo,
                  ...relation,
                },
              };
            }
          }
        }
      }
    }
  });

  const _schema = new Schema(schema);
  if (_schema.relations) delete _schema.relations;
  store.defineMapper(modelName, {
    endpoint: modelName + 's',
    schema: _schema,
    relations: relationsBetween,
  });
});
global.store = store;
