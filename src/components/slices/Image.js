import React, { Fragment } from 'react'
import { RichText } from 'prismic-reactjs'

// Default Image
const Image = ({ slice }) =>
	<div className="post-image container">
		<figcaption className="block-img">
			<img src={ slice.primary.image.url } alt={ slice.primary.image.alt } />
			{ slice.primary.caption && RichText.asText(slice.primary.caption) !== ""
				? <figcaption className="image-label">
					{ RichText.asText(slice.primary.caption) }
					</figcaption>
				: null
			}
		</figcaption>
	</div>

const render = function(slice) {
			return <Image slice={ slice } />
}

export default ({ slice }) => {
  return (
		<Fragment>
			{ render(slice) }
		</Fragment>
	);
}
