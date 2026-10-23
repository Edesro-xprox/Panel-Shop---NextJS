import { API_URL } from '../lib/api';

const userService = {
  getUsers: async () =>{
    try{
      const res = await fetch(`${API_URL}/users`);
      return await res.json();
    }catch(error){
      console.error(error);
    }
  },
  getUserById: async(id) =>{
    try{  
      const res = await fetch(`${API_URL}/users/${id}`);
      return await res.json();
    }catch(error){
      console.error(error);
    }
  },
  createUser: async (payload) =>{
    try{
      const res = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
      return await res.json();
    }catch(error){
      console.error(error);
    }
  },
  updateUser: async (id, payload) =>{
    try{
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }, //Si el cuerpo de una petición se enviará en formato JSON, se debe agregar en headers el tipo de contenido
        body: JSON.stringify(payload)
      });
      return await res.json();
    }catch(error){
      console.error(error)
    }
  }
}

export default userService;