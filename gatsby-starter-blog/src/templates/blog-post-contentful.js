import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostContentfulTemplate = ({
  data: { site, contentfulPost: post },
  location,
  pageContext: {next, previous}
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.content.raw }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
                <Link to={`/${previous.node.slug}`} rel="prev">
                    ← {previous.node.title}
                </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.node.slug}`} rel="next">
                {next.node.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export const Head = ({ data: { contentfulPost: post } }) => {
  return (
    <Seo
      title={post.title}
      description={post.subtitle}
    />
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query BlogPostContentfulBySlug($slug: String) {
  site {
    siteMetadata {
      title
    }
  }
  contentfulPost(slug: { eq: $slug }) {
    title
    author
    subtitle
    content {
      raw
    }
  }
}
`
