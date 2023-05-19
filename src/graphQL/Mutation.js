import { gql } from "@apollo/client";

const CREATE_COMMENT=gql`
mutation createComment(
    $name:String!
    $comment:String!
    $email:String!
    $slug:String!
){
    createComment(data: {name: $name, comment: $comment, email: $email, music:{connect:{slug:$slug}}}) {
    id}
}`



export {CREATE_COMMENT}