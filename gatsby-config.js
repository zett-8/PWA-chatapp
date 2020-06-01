module.exports = {
  siteMetadata: {
    title: `pwa chat`,
    description: `chatapp`,
    author: `Toshiki Kamei`,
    url: 'https://url.sample.com',
    ogImage: '',
    twitterImage: '',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Great Gatsby`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `fullscreen`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    // {
    //   resolve: "gatsby-plugin-sentry",
    //   options: {
    //     dsn: "<add dsn here>",
    //     // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
    //     // environment: process.env.NODE_ENV,
    //     // enabled: (() => ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)()
    //   }
    // }
  ],
}
