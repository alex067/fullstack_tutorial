import axios from 'axios';
import {FETCH_USER} from './types';


export const fetchUser = () => (
    async dispatch => {
        // in production, relative path will automatically direct to our backend server via proxy setup
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload:res.data});
    }
);