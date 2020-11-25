import {DataStore, Schema} from 'js-data';
import {HttpAdapter} from 'js-data-http';
// import Path from 'path';

const store = new DataStore();
const httpAdapter = new HttpAdapter({
  // Our API sits behind the /api path
  basePath: 'https://devamjad.herokuapp.com/',
});

store.registerAdapter('http', httpAdapter, {default: true});

// const runDemo = async function () {
//   let user = await store.find('user', 1);
//   user = await store.update('user', user.id, {name: 'Johnny'});
//   await store.destroy('user', user.id);
// };

const user = new Schema({
  title: 'User', // optional
  description: 'Schema for User records', // optional
  type: 'object',
  properties: {
    id: {type: 'number'},
    name: {type: 'string'},
  },
});

store.defineMapper('user', {
  // Our API endpoints use plural form in the path
  endpoint: 'users',
  schema: user,
  beforeFind: function (id, opts) {
    // console.log('yes');
  },
  afterFind: function (id, opts) {
    // console.log(id);
  },
  //   relations: relations.user,
  //   getLoggedInUser() {
  //     if (this.loggedInUser) {
  //       return utils.resolve(this.loggedInUser);
  //     }
  //     return store
  //       .getAdapter('http')
  //       .GET('/api/users/loggedInUser')
  //       .then((response) => {
  //         const user = (this.loggedInUser = response.data);
  //         if (user) {
  //           this.loggedInUser = store.add('user', user);
  //         }
  //         return this.loggedInUser;
  //       });
  //   },
});

global.store = store;
