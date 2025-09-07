import axios from "axios";

let baseUrl = "http://localhost:3000/auth/login";
export async function UseloginValidation({ userName, password }) {
   try {
    const response = await axios.post(baseUrl, {
     username: userName,
      password: password
    });
    const result = response.data;
       if (result.success && result.data?.access_token) {
      // Guardamos el token y los datos del usuario
      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("user", result.data.user.payload.username);
      return result;
    } else {
      return 400;
    }
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
}
//     if (response.data.length !== 0) {
//       console.log(response.data);
//       return response.data;
//     }else{
//       console.log(response.data);
//       return 400;
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
 
// }
