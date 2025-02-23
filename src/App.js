import {Routes, Route, useNavigate, Link} from 'react-router-dom'
import FormLocation from './components/FormLocation';
import DetailLocation from './components/DetailLocation';
import Annonces from './components/Annonces';
import Inscrip from './components/Inscrip';
import Auth from './components/Auth';
import TableauAdmin from './components/TableauAdmin';
import Map from './components/Map';
import Reservations from './components/Reservations';
import AdminLocations from './components/AdminLocations';
import { useDispatch } from 'react-redux';
import { authCancel } from './action/actionsLocation';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const location = useLocation();
 const users = useSelector(state=>state.users)
 const idConnecter = useSelector(state=>state.idConnecter)

 const user = users.find((us) => us.id === idConnecter) || {};
 const userName = user.nom ? `${user.nom} ${user.prenom}` : "";
 const admin = user.admin || false; 


 useEffect(() => {
  if (!idConnecter) {
      navigate('/');
  }
}, [idConnecter, navigate]);

  return (
    <div className="App p-2">
      <nav className="navbar navbar-expand-lg bg-primary text-white p-3 shadow">
        <div className="container-fluid">
          <h1 className="navbar-brand mb-0 h1 text-light font-monospace p-2">  <i className="bi bi-house-door"></i> Location App</h1>
          {(location.pathname!=='/' && location.pathname!=='/inscrip')&& <div className='text-uppercase'>{userName }&nbsp; <button className='btn btn-dark' onClick={()=>{   console.log("Logout button clicked!");
dispatch(authCancel());}}>Se deconnecter</button></div>
}
        </div>
        
      </nav>
      {location.pathname!== '/' && location.pathname !== '/inscrip'?
      <nav>
      <ul className="nav">
  <li className="nav-item">
    <Link className="nav-link" to="/map">🌍 Exploration Map</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/annonces">📢 Annonces</Link>
  </li>

  { admin ? (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/adminlocations">⚙️ Gestion Annonces</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/tableauadmin">📊 Mon Tableau de bord</Link>
      </li>
    </>
  ) : (
    <>
      <li className="nav-item">
        <Link className="nav-link" to={`/reservations/${user.id}`}>📑 Réservations sur Mes Annonces</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/form">➕ Nouvelle Annonce</Link>
      </li>
    </>
  )}
</ul>


      </nav>:''}
     <Routes>
      
      <Route exact path='/' element={<Auth/>}></Route>
      <Route path='/inscrip' element={<Inscrip/>}></Route>
      <Route path='/annonces' element={<Annonces/>}></Route>
      <Route path='/map' element={<Map/>}></Route>
      <Route path='/location/:id' element={<DetailLocation/>} ></Route>
      <Route path='/form' element={<FormLocation/>}></Route>
      <Route path='/adminlocations' element={<AdminLocations/>}></Route>
      <Route path='/reservations/:id' element={<Reservations/>}></Route>
      <Route path='/tableauadmin' element={<TableauAdmin/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
