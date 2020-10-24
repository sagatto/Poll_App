// import reducers and actions
import { reducer } from '../utils/reducers';
import {
    UPDATE_POLLS,
    SELECTED_POLL,
    CREATE_POLL,
} from "../utils/actions";

// global state sample
const initialState = {
    allPolls: [],
    selectedPoll: {
        question: 'How was our latest funding round ?',
        category: 'Funding',
        voteCount: 5
    },
    newPoll: {
        question: 'Enter Question',
        category: 'Enter Category'
    }
};

test('UPDATE_POLLS', () => {
  let newState = reducer(initialState, {
    type: UPDATE_POLLS,
    allPolls: [{}, {}]
  });
  expect(newState.allPolls.length).toBe(2);
  expect(initialState.allPolls.length).toBe(0);
});

test('SELECTED_POLL', () => {
  let newState = reducer(initialState, {
    type: SELECTED_POLL,
    selectedPoll: {
        question: 'How much did we get in the latest funding round ?'
    }
  });

  expect(newState.selectedPoll.question).toBe('How much did we get in the latest funding round ?');
  expect(initialState.selectedPoll.question).toBe('How was our latest funding round ?');
});

test('CREATE_POLL', () => {
  let newState = reducer(initialState, {
    type: CREATE_POLL,
    newPoll: {
        question: 'How is hiring ramping up ?'
    }
  });
  expect(newState.newPoll.question).toBe('How is hiring ramping up ?');
  expect(initialState.newPoll.question).toBe('Enter Question');
});