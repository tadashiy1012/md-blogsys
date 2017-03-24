import { createAction } from 'redux-actions';
import request from 'superagent';

export const echo = createAction('ECHO');