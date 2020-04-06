import { gql } from "apollo-boost";

export default gql`
    mutation DeleteMessage($id: String!) {
        deleteMessage(id: $id) {
            status
            message
        }
    }
`;