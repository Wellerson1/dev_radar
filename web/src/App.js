import React, {useState, useEffect} from 'react';
import './global.css';
import './app.css';
import './Sidebar.css';
import './main.css';
import api from './services/api';
import DevItem from './components/DevItem/index'
import DevForm from './components/DevForm'

function App() {
  const [devs, setDevs] = useState([]);

//dispara uma função toda vez que uma informação alterar
useEffect(()=>{
  //carrega os devs do backendd no front
  async function loadDevs(){
    const response = await api.get('/devs');
    setDevs(response.data)
  }
  loadDevs();
})

//envia o registro do dev para o backend
async function handleAddDev(data){
  const response = await api.post('/devs', data)
  setDevs([...devs, response.data])
}
  return (
    <div id="app">
        <aside>
          <strong>Cadastro</strong>
            <DevForm onSubmit={handleAddDev} />
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              //função map percorre por todos os devs e atribui cada dev na variavel
              //componente*, passa a propriedade 'dev' 
            <DevItem key={dev._id} dev={dev}/>
            ))}
            
          </ul>
        </main>
    </div>
  );
}

export default App;
