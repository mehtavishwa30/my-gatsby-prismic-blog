import React from 'react'
import { RichText } from 'prismic-reactjs'
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'

export const query = graphql`
{
  prismic{
    allBlog_homes(uid:null){
      edges{
        node{
          _meta{
            id
            type
          }
          headline
          description
          image
        }
      }
    }
    allPosts(sortBy: date_DESC){
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
            ... on PRISMIC_PostBodyText{
              type
              label
              primary{
                text
              }
            }
          }
        }
      }
    }
  }
}
`

// Using the queried Blog Home document data, we render the top section
const BlogHome = ({ home }) => {  
  const avatar = { backgroundImage: 'url(' + home.image.url +')' };
  return (
    <div className="home-header container">
        <div className="fixed-nav-bar">
          <ul class="navigation">
            <li><a href="/">Blog Home</a></li>
          </ul>
        </div>
      <div className="blog-avatar" style={ avatar }>
      </div>
      <h1>{ RichText.asText(home.headline) }</h1>
      <p className="blog-description">{ RichText.asText(home.description) }</p>
    </div>
  );
};

export default ({ data }) => {
  const doc = data.prismic.allBlog_homes.edges.slice(0,1).pop();
  const posts = data.prismic.allPosts.edges;

  if(!doc) return null;

  return(
    <Layout>
      <BlogHome home={ doc.node } />
      <BlogList posts={ posts }/>
    </Layout>
  )
}
