import {gql} from "@apollo/client";

export const GET_CONTINENTS_WITH_DATA = gql`
    query {
        continents(filter: {code: {in: ["AF", "SA"]}}) {
            name
            countries{
                name
                languages{
                    name
                }
            }
        }
    }
`

export const GET_CONTINENTS_AND_LANGUAGES = gql`
    query {
        continents{
            name
            
        }
        languages{
            name
        }
    }
`