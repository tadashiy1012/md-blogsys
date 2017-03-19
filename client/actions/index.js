import { createAction } from 'redux-actions';
import request from 'superagent';

const execFetch = () => {
  return new Promise((resolve, reject) => {
    const url = '/entry';
    request.get(url).end((err, res) => {
      if (err) {
        reject(err);
      } else {
        const obj = JSON.parse(res.text);
        resolve(obj);
      }
    });
  });
};

export const fetchEntries = createAction('FETCH_ENTRIES', async () => {
 const result = await execFetch();
 return result;
});