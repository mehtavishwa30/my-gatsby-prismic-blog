import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

export default ({ slice }) =>
  <div className="post-text container">
    <div>
      { RichText.render(slice.primary.text, linkResolver) }
    </div>
  </div>
