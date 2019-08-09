import React from 'react'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import Layout from '../components/Layout' 
import { Image, Quote, Text } from '../components/slices'

export const query = graphql`
query BlogPostQuery($uid: String) {
  prismic{
    allPosts(uid: $uid){
      edges{
        node{
          _meta{
            id
            uid
            type
          }
          title
          date
          body{
            __typename
            ... on PRISMIC_PostBodyText{
              type
              label
              primary{
                text
              }
            }
            ... on PRISMIC_PostBodyQuote{
              type
              label
              primary{
                quote
              }
            }
            ... on PRISMIC_PostBodyImage_with_caption{
              type
              label
              primary{
                image
                caption
              }
            }
          }
        }
      }
    }
  }
}
`

const Slices = ({ slices }) => {
  return slices.map((slice, index) => {
    const res = (() => {
      switch(slice.type) {
        case 'text': return (
          <div key={ index } className="homepage-slice-wrapper">
            { <Text slice={ slice } /> }
          </div>
        )

        case 'quote': return (
          <div key={ index } className="homepage-slice-wrapper">
            { <Quote slice={ slice } /> }
          </div>
        )

        case 'image_with_caption': return (
          <div key={ index } className="homepage-slice-wrapper">
            { <Image slice={ slice } /> }
          </div>
        )

        default: return
      }
    })();
    return res;
  })
}

const Body = ({ Post }) => {
  const titled = Post.title.length !== 0 ;
  return (
    <div>
      <div className="container post-header">
        <div className="fixed-nav-bar">
          <ul class="navigation">
            <li><a href="/">Blog Home</a></li>
          </ul>
        </div>
        <h1>
          { titled ? RichText.asText(Post.title) : 'Untitled' }
        </h1>
      </div>
      <Slices slices={ Post.body } />
    </div>
  );
}

export default (props) => {
  const doc = props.data.prismic.allPosts.edges.slice(0,1).pop();

  if(!doc) return null;

  return(
    <Layout>
      <Body Post={ doc.node } />
    </Layout>
  )
}
