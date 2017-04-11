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
const execPut = (id, title, body) => {
  return new Promise((resolve, reject) => {
    const url = '/admin/entry/' + id;
    request.put(url)
      .send({title: title, body: body})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) { reject(err); }
        else {
          resolve(JSON.parse(res.text));
        }
      });
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
const execDelete = (tgtId) => {
  return new Promise((resolve, reject) => {
    const url = '/admin/entry/' + tgtId;
    request.del(url).end((err, res) => {
      if (err) { reject(err); }
      else {
        resolve(JSON.parse(res.text));
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
export const select = createAction('SELECT');
export const editForm = createAction('EDIT_FORM');
export const updateEntry = createAction('UPDATE_ENTRY', async (id, title, body) => {
  const result = await execPut(id, title, body);
  return result;
});
export const reUpdateResult = createAction('RE_UPDATE_RESULT');
export const delEntry = createAction('DEL_ENTRY', async (id) => {
  const result = await execDelete(id);
  return result;
});