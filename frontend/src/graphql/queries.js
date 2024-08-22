import { gql } from '@apollo/client';

export const ALL_TAXI_PARTY = gql`
    query FetchAllTaxiParty {
        fetchAllTaxiParty{
            id
            name
            startTime
            isNotmalTaxi
            startLocation {
                address
                lat
                lng
            }
            endLocation {
                address
                lat
                lng
            }
            taxiPartyTags {
                name
            }
            users {
                userName
            }
        }
    }
`;

export const MY_TAXI_PARTIES = gql`
    query FetchMyTaxiParties {
        fetchMyTaxiParties{
            id
            name
            startTime
            isNotmalTaxi
            startLocation {
                address
                lat
                lng
            }
            endLocation {
                address
                lat
                lng
            }
            taxiPartyTags {
                name
            }
            users {
                userName
            }
        }
    }
`;

export const COMMENTS = gql`
    query FetchComments($taxiPartyId: String!) {
        fetchComments(taxiPartyId: $taxiPartyId){
            id
            sendTime
            content
            writer {
                userName
                email
            }
        }
    }
`;

export const FETCH_USER = gql`
    query FetchUser {
        fetchUser{
            userName
            email
        }
    }
`;