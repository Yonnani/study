import * as React from 'react'; // 
import ReactDOM from 'react-dom'

const ThemeContext = React.createContext();

const Content = () => {
  const context = React.useContext(ThemeContext);
  return (
    <section className={`theme-${context.theme}`}>
      <span>Current theme: {context.theme}</span>
      <button onClick={context.switchTheme}>Switch Theme</button>
    </section>
  );
};

function App() {
  const [theme, setTheme] = React.useState("dark");
  const switchTheme = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };
  return (
    <ThemeContext.Provider value={{theme, switchTheme}}>
      <Content />
    </ThemeContext.Provider>
  );
}

document.body.innerHTML = "<div id='root'></div>";
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);