import { gql } from "apollo-boost";

export default gql`
    mutation AddMessage($message: MessageInput!) {
        addMessage(message: $message) {
            _id
            text
            date
            author {
                name
            }
        }
    }
`;