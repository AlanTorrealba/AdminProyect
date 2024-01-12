import axios from "axios"


let baseUrl = "http://localhost:3000/api/user"
export async function UseloginValidation({userName, password}) {
    try {
    
        const response = await axios.get(baseUrl, {
          params: { username: userName, password: password },
        });
    
        console.log(response.data);
        if( response.data.length !== 0 ){
          return true
        } 
               // Puedes retornar o hacer algo con la respuesta aquí
        // return response.data;
      } catch (error) {
        console.error(error);
    
        // Puedes manejar el error aquí si es necesario
        throw error;
      }
// let login
//     if ( userName === "Alan" && password == "12345" ){ 
//        login = true
      
//     }else{
//         login = false
//     }

    
//     return login
}