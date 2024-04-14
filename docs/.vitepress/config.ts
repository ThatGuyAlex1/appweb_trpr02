import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "appweb-trpr02",
  description: "TP2 documentation",
  base: '/appweb_trpr02/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Semaine 1', link: '/week1/week1' },
      { text: 'Semaine 2', link: '/week2/week2' },
      { text: 'Semaine 3', link: '/week3/week3' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Semaine 1', link: '/week1/week1' },
          { text: 'Semaine 2', link: '/week2/week2' },
          { text: 'Semaine 3', link: '/week3/week3' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
