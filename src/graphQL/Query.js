import {gql} from "@apollo/client"


const GET_AVATARS_RAPPERS=gql`
query{
  rapers {
    avatar {
      url
    }
    id
    slug
    name
  }
}
`;
const GET_MUSICS_PAGE_INFO=gql`
query{
  musics {
    coverMusic {
      url
    }
    name
    raper {
      avatar {
        url
      }
      name
    }
    
    slug
    title
  }
}
`;
const GET_MUSIC_PLAY=gql`
query GETPlay($slug:String!){
  music(where: {slug: $slug}) {
    audioMusic {
      url
    }
    coverMusic {
      url
    }
    name
    title
    musicText {
      html
    }
    musicTextTranslate{
      html
    }
  }
  }
`
const GET_RAPPERS_PAGE=gql`
query{
  rapers {
    avatar {
      url
    }
    id
    name
    slug
    description {
      text
      html
    }
    descriptionText
  }
}`
const GET_RAPPER_INFO=gql`
query GetRapper($slug:String!) {
  raper(where: {slug: $slug}) {
    avatar {
      url
    }
    name
    slug
    description {
      html
    }
    raper {
      ... on Music {
        id
        name
        title
        slug
        coverMusic {
          url
        }
      }
    }
  }
}

`
const GET_CAMMENTS=gql`
query getCamments($slug:String!){
  comments(where: {music: {slug: $slug}}) {
    email
    comment
    name
  }
}
`

  









export{GET_AVATARS_RAPPERS,GET_MUSICS_PAGE_INFO,GET_MUSIC_PLAY,GET_RAPPERS_PAGE,GET_RAPPER_INFO,GET_CAMMENTS}




