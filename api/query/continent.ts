import {gql} from "@apollo/client";

export const GET_CONTINENTS = gql`
    query {
        continents(filter: {code: {in: ["AF", "SA"]}}) {
            code
            name
            countries{
                code
                name
                languages{
                    code
                    name
                }
            }
        }
    }
`