import { gql } from "apollo-boost";

export default gql`
    query {
        messages: getMessages {
            text
            date
            author {
                name
            }
        }
    }
`;