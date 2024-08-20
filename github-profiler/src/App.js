import './styles.css';
import { useState, useEffect } from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import Card from './Card';

function App() {

  const override = {
    // margin: "20%"
  }

  const [ userName, setUserName ] = useState("king525dev");
  const [ userData, setUserData ] = useState(null);
  const [ loading, setLoading ] = useState(true);

  function handleSubmit(e){
    e.preventDefault();
    fetchData();
  }

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    
    if(data){
      setUserData(data);
      setLoading(false);
    }

    console.log(userData);
  }
  

  useEffect(() => {
    fetchData();
  }, [])

  if(loading){
    return <SyncLoader 
      color={"#eee"}
      size={30}
      cssOverride={override}
    />;
  }

  return (
    <div className="container p-4">
      <div className="input-wrapper">
        <input 
          name="search-by-username"
          type="search"
          placeholder="Search Github Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button onClick={handleSubmit}>Search</button>

        <Card user={userData}/>
      </div>
      
    </div>
  );
}

export default App;
