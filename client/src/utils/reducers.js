import { useReducer } from "react";
import {
  UPDATE_POLLS,
  SELECTED_POLL,
  CREATE_POLL,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_POLLS:
      return {
        ...state,
        allPolls: [ ...action.allPolls ],
      };
    case SELECTED_POLL:
      return {
        ...state,
        selectedPoll: { ...action.selectedPoll },
      };
      case CREATE_POLL:
        return {
          ...state,
          newPoll: { ...action.newPoll },
        };
    default:
      return state;
  }
};

export function usePollReducer(initialState) {
  return useReducer(reducer, initialState);
}
