import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password)
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($userName: String!, $password: String!) {
    createUser(userName: $userName, password: $password) {
      id
      userName
    }
  }
`

export const CREATE_PARTY_MUTATION = gql`
  mutation CreateTaxiParty($createTaxiPartyInput: CreateTaxiPartyInput!) {
    createTaxiParty(createTaxiPartyInput: $createTaxiPartyInput) {
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
    }
  }
`

export const JOIN_IN_TAXI_PARTY = gql`
  mutation JoinInTaxiParty($taxiPartyId: String!) {
    joinInTaxiParty(taxiPartyId: $taxiPartyId) {
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
`

export const LEAVE_TAXI_PARTY = gql`
  mutation LeaveTaxiParty($taxiPartyId: String!) {
    leaveTaxiParty(taxiPartyId: $taxiPartyId)
  }
`

export const CREATE_COMMENT = gql`
  mutation CreateComment($CreateCommentInput: CreateCommentInput!) {
    createComment(CreateCommentInput: $CreateCommentInput) {
      id
      sendTime
      content
      taxiParty {
        id
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $userName: String!
    $oldPassword: String!
    $password: String!
  ) {
    updateUser(
      userName: $userName
      oldPassword: $oldPassword
      password: $password
    ) {
      userName
    }
  }
`

export const RESTORE_ACCESS_TOKEN = gql`
  mutation RestoreAccessToken {
    restoreAccessToken
  }
`
