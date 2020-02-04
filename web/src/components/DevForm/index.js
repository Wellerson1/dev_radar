import React , {useState, useEffect} from 'react'

function DevForm({onSubmit}){
    //criando variaveis de estado 
        
        const [github_username, setGitHubUsername] = useState('');
        const [techs, setTechs] = useState('');
        const [latitude, setLatitude] = useState('');
        const [longitude, setLongitude] = useState('');

        //dispara uma função toda vez que uma informação alterar
    useEffect(()=>{
        //captura a localização do usuário
        navigator.geolocation.getCurrentPosition(
        //retorna a posição de latitude e longotude
        (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (err)=>{
            console.log(err)
        },
        {
            timeout: 30000
        }
        )
    }, []);

    //envia o registro do dev para o backend
    async function handleSubmit(e){
      //evita comportamento padrão de mandar o usuário pra outra tela
      e.preventDefault();
      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
      });
      //zera os campos de formulário
      setGitHubUsername('');
      setTechs(''); 
    }  
    return(
        <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="github_username">Usuário do github</label>
                <input 
                    name="github_username" 
                    id="github_username" 
                    required
                    value={github_username}
                    onChange={e=>setGitHubUsername(e.target.value)}/>
              </div>

              <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input 
                    name="techs" 
                    id="techs" 
                    required
                    value={techs}
                    onChange={e=>setTechs(e.target.value)}/>
              </div>

                <div className="input-group">
                <div className="input-block">
                  <label htmlFor="latidude">Latidude</label>
                  <input 
                    name="latitude" 
                    id="latidude" 
                    required 
                    value={latitude} 
                    onChange={e=>setLatitude(e.target.value)}
                    />
                </div>
                
                <div className="input-block">
                  <label htmlFor="longitude">Longitude</label>
                  <input 
                      name="longitude" 
                      id="longitude" 
                      required 
                      value={longitude}
                      onChange={e=>setLatitude(e.target.value)}/>
                </div>
                </div>
              <button type="submit">Salvar</button>
            </form>
    );
}

export default DevForm;