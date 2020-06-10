import { API_URL, BASE_URL, EXTERNAL_API_URL } from '../config';

import axios from 'axios';
import { convertData } from '../utils';

/* action name creator */
const reducerName = 'people';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* SELECTORS */

export const getPeople = ({ people }) => people.data;
export const getRequest = ({ people }) => people.request;

/* ACTIONS */

export const LOAD_RANDOM_PEOPLE = createActionName('LOAD_RANDOM_PEOPLE');
export const START_REQUEST = createActionName('START_REQUEST');
export const END_REQUEST = createActionName('END_REQUEST');
export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const REMOVE_ITEM = createActionName('REMOVE_ITEM');
export const EDIT_ITEM = createActionName('EDIT_ITEM');

/* ACTION CREATORS */

export const loadRandomPeople = (payload) => ({
  payload,
  type: LOAD_RANDOM_PEOPLE,
});
export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });
export const resetRequest = () => ({ type: RESET_REQUEST });
export const removeItem = (payload) => ({ payload, type: REMOVE_ITEM });
export const editItem = (payload) => ({ payload, type: EDIT_ITEM });

/* INITIAL STATE */

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_RANDOM_PEOPLE: {
      return {
        ...statePart,
        data: action.payload,
      };
    }
    case START_REQUEST: {
      return {
        ...statePart,
        request: {
          pending: true,
          error: null,
          success: null,
        },
      };
    }
    case END_REQUEST: {
      return {
        ...statePart,
        request: {
          pending: false,
          error: null,
          success: true,
        },
      };
    }
    case ERROR_REQUEST: {
      return {
        ...statePart,
        request: {
          pending: false,
          error: action.error,
          success: false,
        },
      };
    }
    case REMOVE_ITEM:
      const listWithRemovedItem = statePart.data.filter(
        (el) => el.id !== action.payload
      );

      return {
        ...statePart,
        data: listWithRemovedItem,
      };
    case EDIT_ITEM:
      let itemToEdit = statePart.data.find((el) => el.id === action.payload.id);
      itemToEdit = action.payload;
      const listWithEditedItem = statePart.data.map((el) =>
        el.id === action.payload.id ? itemToEdit : el
      );
      return {
        ...statePart,
        data: listWithEditedItem,
      };
    default:
      return statePart;
  }
}

/* THUNKS */

export const loadFromExternalServerRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const res = await axios.get(
        `${EXTERNAL_API_URL}?results=10&inc=name,location,email,picture`
      );

      async function pushToLocalServer(record) {
        await axios.post(`${BASE_URL}${API_URL}`, record);
      }

      const convertedData = convertData(res.data.results);
      convertedData.forEach(pushToLocalServer);

      dispatch(loadRandomPeople(convertData(res.data.results)));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const loadFromLocalServerRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      const res = await axios.get(`${BASE_URL}${API_URL}`);
      dispatch(loadRandomPeople(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const removeItemRequest = (id) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      await axios.delete(`${BASE_URL}${API_URL}/${id}`);
      dispatch(removeItem(id));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const editItemRequest = (editedItem) => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      await axios.put(`${BASE_URL}${API_URL}/${editedItem.id}`, editedItem);
      dispatch(editItem(editedItem));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};
