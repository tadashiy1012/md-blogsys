import { createAction } from 'redux-actions';

const execFetch = () => {
  return new Promise((resolve) => {
    resolve([1,2,3]);
  });
};

export const fetchEntries = createAction('FETCH_ENTRIES', async () => {
 const result = await execFetch();
 return result;
});