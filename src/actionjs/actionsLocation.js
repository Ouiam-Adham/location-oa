export function deleteLocation(id){
    return{
        type:'DELETE_LOCATION',
        payload: id
    }

}
export function blockLocation(id){
    return{
        type:'BLOCK_LOCATION',
        payload: id
    }

}
export function unblockLocation(id){
    return{
        type:'UNBLOCK_LOCATION',
        payload: id
    }

}
export function addLocation(location){
    return{
        type:'ADD_LOCATION',
        payload: location
    }

}
export function acceptReservation(id){
    return{
        type:'ACCEPT_RESERVATION',
        payload: id,
    }
}
export function authRequest(id){

    return{
        type:'AUTH_REQUEST',
        payload: id
    }

}
export function authCancel(){
    return{
        type:'AUTH_CANCEL',
    }

}
export function addReservation(idLocation, idOwner, idReserver, price){
    return{
        type:'ADD_RESERVATION',
        payload: {id: Date.now() ,idLocation ,idOwner, idReserver,
            accepted: false, price}
    }
}
export function addUser(user){
    return{
        type:'ADD_USER',
        payload: user,
    }
}
