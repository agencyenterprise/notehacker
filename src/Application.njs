import Nullstack from "nullstack";
import "./Application.scss";
import Home from "./Home";
import "./styles.css";

class Application extends Nullstack {
  prepare({ project, page }) {
    page.locale = "en-US";
    page.title = `${project.name}`;
    page.description = `${project.name} was made with Nullstack`;
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
    );
  }

  render() {
    return (
      <main>
        <Head />
        <Home route="/" />
      </main>
    );
  }
}

export default Application;
