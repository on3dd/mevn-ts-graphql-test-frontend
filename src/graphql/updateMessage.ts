import { gql } from "apollo-boost";

export default gql`
    mutation UpdateMessage($id: String!, $newText: String!) {
        updateMessage(id: $id, newText: $newText) {
            status
            message
        }
    }
`;