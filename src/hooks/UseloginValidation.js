

export function UseloginValidation({userName, password}) {
let login
    if ( userName === "Alan" && password == "12345" ){ 
       login = true
      
    }else{
        login = false
    }

    
    return login
}