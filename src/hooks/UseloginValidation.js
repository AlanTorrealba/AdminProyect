import axios from "axios";

let baseUrl = "http://localhost:3000/api/user";
export async function UseloginValidation({ userName, password }) {
  try {
    const response = await axios.get(baseUrl, {
      params: { username: userName, password: password },
    });

    if (response.data.length !== 0) {
      return true;
    }
  } catch (error) {
    console.error(error);
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
