import logo from './logo.png';
import './style/yankee.css';
import Projects from './components/projects/projects'
import Menubar from './components/menubar/menubar'



function App() {
  return (
<div class="main">
<header>
<Menubar />
    </header>

<Projects />

<div class="dialog-wrapper">

</div>
</div>

  );
}

export default App;
