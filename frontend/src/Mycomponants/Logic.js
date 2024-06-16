export const getCheckVotes=(users,loggedUser)=> {
   { console.log(users)}
   { console.log(loggedUser)}
    for(let i=0;i<users.length;i++){
    
        if(users[i]._id === loggedUser){
            return true;
        } 
    }

    return false; 
  };