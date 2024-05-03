const path = require("path")

const blogPost = path.resolve(`./src/templates/blog-post-contentful.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            title
            author
            slug
            image {
              url
            } 
            content {
              raw
            } 
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.edges
    console.log(posts)
  if (posts.length > 0) {
    posts.forEach(({node: post}, index) => {
      const previous = index === 0 ? null : posts[index - 1]
      const next = index === posts.length - 1 ? null : posts[index + 1]
      createPage({
        path: post.slug,
        component: blogPost,
        context: {
          slug: post.slug,
          previous,
          next,
        },
      })
    })
  }
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
