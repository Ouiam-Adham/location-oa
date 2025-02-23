import React, { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authRequest } from '../action/actionsLocation';
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [valid, setValid] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(state=>state.users)
  const idConnecter = useSelector(state => state.idConnecter);
  
  useEffect(() => {
    if (idConnecter) {
        navigate('/annonces');
    }
}, [idConnecter,navigate]); 

  function handleSubmit(e) {
    e.preventDefault();
    if (!user || !pass) {
      setValid('Tous les champs doivent être remplis');
      return;
    }
    const userFinded = users.find((us)=>{return us.email === user && us.pass === pass})
    if(userFinded.id){
    dispatch(authRequest(userFinded.id));

    setUser('');
    setPass('');
  }else{
      setValid("Identifiants incorrects");
      return;
    }
  }
  

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Connexion</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email :</label>
            <input 
              type="email" 
              className="form-control" 
              value={user} 
              onChange={(e) => setUser(e.target.value)} 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Mot de pass :</label>
            <input 
              type="password" 
              className="form-control" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
            />
          </div>

          {valid && <p className="text-danger text-center">{valid}</p>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">Se connecter</button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link to="/Inscrip" className="text-decoration-none">Créer un compte ?</Link>
        </div>
      </div>
    </div>
  );
}
