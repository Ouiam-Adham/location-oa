


const initialState={
    idConnecter: JSON.parse(localStorage.getItem('idconnecter')),
    reservations: localStorage.getItem('reservations') 
    ? JSON.parse(localStorage.getItem('reservations')) 
    : [{ id: 456, idLocation: 124, idOwner: 11, idReserver: 10, accepted: false }],
    locations: JSON.parse(localStorage.getItem('locations'))|| [{id:123,title:'appartement spacieux', type:'appartement', rooms:'2',images:['/images/ap123.jpg'], adress:'kenitra', lat: '34.2607', lng: '-6.5779',price:'3000', description:'appartement en centre ville', idOwner:11, blocked: false, available:true},
    {id:124,title:'appartement neuf', type:'appartement', rooms:'2',images:['/images/ap124.jpg'], adress:'kenitra', lat: '34.1999', lng: '-6.6000',price:'4000', description:'appartement spacieux eclaire et climatise', idOwner:11, blocked: false, available:true}],
    users: [...JSON.parse(localStorage.getItem('users'))||[],{id:10,nom:'ahmed', prenom:'alami',ville:'kenitra', email:'ahmed.alami@gmail.com',pass:'101010', admin:true},{id:11,nom:'ali', prenom:'alaoui',ville:'kenitra', email:'ali.alaoui@gmail.com',pass:'101010', admin:false}]
}
const reducer = (state=initialState, action)=>{
    switch(action.type){
        case 'AUTH_REQUEST':
            localStorage.setItem('idconnecter', JSON.stringify(action.payload));

                return {...state, idConnecter:action.payload};

        case 'AUTH_CANCEL':
            localStorage.removeItem('idconnecter');
            return {...state, idConnecter:null};


        case 'ADD_LOCATION':
            return {...state, locations: '' };

        case 'DELETE_LOCATION':        
            const locationsFiltered = state.locations.filter((location)=>{ return location.id !==action.payload});
            localStorage.setItem('locations', JSON.stringify(locationsFiltered));
            return {...state, locations: locationsFiltered  };

        case 'BLOCK_LOCATION':
            
            const locationsUnhandeled = state.locations.filter((location)=>{ return location.id !==action.payload});
            const blockedLocation = state.locations.find((location)=>{ return location.id === action.payload});

            const handledLocation = {...blockedLocation, blocked:true};
            const locationsUpdated =[...locationsUnhandeled, handledLocation ]
            localStorage.setItem('locations', JSON.stringify(locationsUpdated));
            return {...state, locations: locationsUpdated };

        case 'UNBLOCK_LOCATION':
            
            const otherLocations = state.locations.filter((location)=>{ return location.id !==action.payload});
            const unblockedLocation = state.locations.find((location)=>{ return location.id === action.payload});

            const updatedLocation = {...unblockedLocation, blocked:false};
            const upLocations =[...otherLocations, updatedLocation ]
            localStorage.setItem('locations', JSON.stringify(upLocations));
            return {...state, locations: upLocations };



        case 'ADD_RESERVATION':
            const storedReservation = JSON.parse(localStorage.getItem('reservations'))||[];
            localStorage.setItem('reservations', JSON.stringify([...storedReservation, action.payload]))
            return {...state, reservations: 'reservations'};

        case 'ACCEPT_RESERVATION':
            const idReservation = action.payload;
            const updatedReservations = state.reservations.map((reserv)=>{return reserv.id ===idReservation? {...reserv, accepted: true}: reserv})
            localStorage.setItem('reservations', JSON.stringify([...updatedReservations]))
            return {...state, reservations:[...updatedReservations]};

        case 'ADD_USER':
            const storedUsers = JSON.parse(localStorage.getItem('users'))||[];
                localStorage.setItem('users', JSON.stringify([...storedUsers, action.payload]))
                return {...state, users: [...state.users, action.payload] };
        
        default: return state;
    }
}

export default reducer;