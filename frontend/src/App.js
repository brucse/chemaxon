import './App.css';
import Upload from './Upload'

function App() {
  return (
    <>
    <header>header</header>
    <section>
      <Upload />
    </section>
       <table>
        <thead>
          <tr>
            <th>name</th>
            <th>link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>filename</td>
            <td><a>download</a></td>
          </tr>
        </tbody>
      </table>   <section>

    </section>

      <footer>footer</footer>

    </>
  );
}

export default App;
