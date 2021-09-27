const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "React Patro",
  tagline: "AD and BS Calendar functions as hooks and component",
  url: "https://react-patro.netlify.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "Rara Labs",
  projectName: "react-patro",
  themeConfig: {
    navbar: {
      title: "React Patro",
      logo: {
        alt: "react-patro logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Tutorial",
        },
        {
          href: "https://github.com/raralabs/react-patro",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",

      copyright: `Copyright © ${new Date().getFullYear()} Rara Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/raralabs/react-patro/edit/master/doc/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  themes: ["@docusaurus/theme-live-codeblock"],
};
