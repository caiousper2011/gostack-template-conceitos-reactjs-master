import React, {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  let [repositories, setRepositories] = useState([]);
  useEffect(function(){
    api.get('/repositories').then(function(response){
      const {data} = response;

      console.log(data);
      setRepositories(data);
    })
  console.log('');
  },[]);
  async function handleAddRepository() {
    const repository = {
      "title": "Umbriel", "url": "https://github.com/Rocketseat/umbriel", "techs": ["Node", "Express", "TypeScript"]
    }
    const {status, data} = await api.post('/repositories', repository);
    console.log(data)
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    console.log('clicou', id)
    const {status, data} = await api.delete(`/repositories/${id}`)
    const newRepositories = repositories.filter(repository=>repository.id!==id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository=>(
        <li key={repository.id}>
        {repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
        </button>
      </li>)
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
