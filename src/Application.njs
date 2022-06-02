import Nullstack from 'nullstack'
import GoogleAnalytics from 'nullstack-google-analytics'
import Home from './Note/Home'

import './Application.scss'
import './styles.css'

class Application extends Nullstack {
  launch({ project, page }) {
    page.locale = 'en-US'
    page.title = `${project.name}`
    page.description = `${project.name} for those who live in the matrix`
  }

  renderHead() {
    return (
      <head>
        <link href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet"
        />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head />
        <Home route="/" />
        <GoogleAnalytics id="G-8FBBTCHMTJ" />
      </main>
    )
  }
}

export default Application
