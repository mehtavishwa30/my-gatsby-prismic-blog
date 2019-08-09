import React from 'react'
import { Link } from "gatsby"
import { RichText, Date } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'

const PDate = ({ post }) => {
  let postDate = Date(post.date);
  postDate = postDate ? 
    new Intl.DateTimeFormat('en-US', {
      month: 'short', 
      day: '2-digit', 
      year: 'numeric'
    }).format(postDate) :
    '';

  const defaultTitle = "Untitled"
  
  return (
    <div className="post-summary" key={ post.id } >
    <div class="post-box">
      <h2>
        <Link to={ linkResolver(post._meta) }>
          { RichText.asText(post.title).length !== 0 ? RichText.asText(post.title) : defaultTitle }
        </Link>
      </h2>
      <p className="blog-post-meta">
        <time>{ postDate }</time>
      </p>
      { Blurb(post) }
      <center>
      <Link to={ linkResolver(post._meta) } class="btn">View Post</Link>
      </center>
      </div>
    </div>
  );
}

const Blurb = (post => {
  
  let TextSlice = post.body.find(slice => slice.type === 'text');
  if (TextSlice != null) {
    const textLimit = 150
    let text = RichText.asText(TextSlice.primary.text)
    let limitedText = text.substring(0, textLimit)

    if (text.length > textLimit) {
      return (
        <p>{ limitedText.substring(0, limitedText.lastIndexOf(' ')) + '...' }</p>
      );
    } else {
      return <p>{ text }</p>;
    }
  } else {
    return null;
  }
})

export default ({ posts }) => {
  if(!posts) return null;
  
  return(
    <div className="blog-posts container">
      {posts.map((post) => {
        return <PDate post={ post.node } key={ post.node._meta.id }/>
      })}
    </div>
  )
}
