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

export const echo = createAction('ECHO');
export const postEntry = createAction('POST_ENTRY', async (title, body) => {
  const result = await execPost(title, body);
  return result;
});
export const rePostResult = createAction('RE_POST_RESULT');