import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const ADD_POLL = gql`
  mutation addPoll($question: String!) {
    addPoll(question: $question) {
      _id
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
export const LIKE = gql`
mutation addLike($_id: ID!) {
  addLike(_id: $_id){
		_id
    question
    count
  }
}
`;
export const DISLIKE = gql`
mutation addDislike($_id: ID!) {
  addDislike(_id: $_id){
		_id
    question
    count
  }
}
`;
