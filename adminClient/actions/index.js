import { createAction } from 'redux-actions';
import request from 'superagent';

const execPost = (title, body) => {
  return new Promise((resolve, reject) => {
    const url = '/admin/entry';
    request.post(url)
      .send({title: title, body: body})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) { reject(err); }
        else { 
          const obj = JSON.parse(res.text);
          resolve(obj);
        }
      })
  });
};
const execFetchAll = () => {
  return new Promise((resolve, reject) => {
    const url = '/admin/entries';
    request.get(url).end((err, res) => {
      if (err) { reject(err); }
      else {
        const obj = JSON.parse(res.text);
        resolve(obj);
      }
    });
  });
};
const execFetchOne = (tgtId) => {
  return new Promise((resolve, reject) => {
    const url = '/admin/entry/' + tgtId;
    request.get(url).end((err, res) => {
      if (err) { reject(err); }
      else {
        const obj = JSON.parse(res.text);
        resolve(obj);
      }
    });
  });
};

export const echo = createAction('ECHO');
export const postEntry = createAction('POST_ENTRY', async (title, body) => {
  const result = await execPost(title, body);
  return result;
});
export const rePostResult = createAction('RE_POST_RESULT');
export const fetchAll = createAction('FETCH_ALL', async () => {
  const result = await execFetchAll();
  return result;
});
export const fetchOne = createAction('FETCH_ONE', async (id) => {
  const result = await execFetchOne(id);
  return result;
});