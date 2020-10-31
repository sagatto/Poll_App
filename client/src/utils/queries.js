import gql from 'graphql-tag';

export const ALL_POLLS = gql`
{
  allPolls {
		_id
  	question
    count
  }
}
`