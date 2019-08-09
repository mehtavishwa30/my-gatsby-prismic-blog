// Link Resolver generates links to all Prismic docs
exports.linkResolver = function linkResolver(doc) {
  // Route for blog posts
  if (doc.type === 'post') {
    return '/blog/' + doc.uid;
  }

  // Route for blog home
  return '/';
}
