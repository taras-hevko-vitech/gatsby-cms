import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges
  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  return (
    <Layout location={location} title={siteTitle}>
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(({node: post}, index) => {
          const title = post.title || post.slug
          return (
            <li key={post.slug + index}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                </header>
                <section>
                  <p>{post.subtitle}</p>
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
  site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
        edges {
          node {
            title
            author
            subtitle
            slug
            content {
               raw
            }
          }
        }
    }
  }
`
