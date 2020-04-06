import { gql } from "apollo-boost";

export default gql`
    query {
        messages: getMessages {
            _id
            text
            date
            author {
                name
            }
        }
    }
`;