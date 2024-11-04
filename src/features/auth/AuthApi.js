
export  function createUser(userData) {
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch("/auth/signup",{
      method:"POST",
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
    })
     const data=response.json();
     resolve({data});
  }
  catch(e){
    console.log(e);
  }
   }
  );
}




export  function loginUser(loginInfo) {
  return new Promise( async(resolve,reject) =>{
   try{
    let response=await fetch(`/auth/login`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(loginInfo)
    })
    if(response.ok){
      const data=await response.json();
      resolve({data})
    }else{
      const err=await response.text();
      reject(err)
    }
  }
  catch(err){
    reject(err)
  }
   }
  );
}


export  function checkAuth() {
  return new Promise( async(resolve,reject) =>{
   try{
    let response=await fetch(`/auth/check`)
    if(response.ok){
      const data=await response.json();
      resolve({data})
    }else{
      const err=await response.text();
      reject(err)
    }
  }
  catch(err){
    reject(err)
  }
   }
  );
}



export  function resetPasswordRequest(email) {
  return new Promise( async(resolve,reject) =>{
   try{
    let response=await fetch(`/auth/reset-password-request`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({email})
    });
    
    if(response.ok && response.status===200){
      const data=await response.json();
      resolve({data})
    }else{
      const err=await response.text();
      reject(err)
    }

  }
  catch(err){
    reject(err)
  }
   }
  );
}


export  function resetPassword(data) {
  return new Promise( async(resolve,reject) =>{
   try{
    let response=await fetch(`/auth/reset-password`,{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    });
    
    if(response.ok && response.status===200){
      const data=await response.json();
      resolve({data})
    }else{
      const err=await response.text();
      reject(err)
    }

  }
  catch(err){
    reject(err)
  }
   }
  );
}



export  function signOut() {
  return new Promise( async(resolve,reject) =>{
    try{
     const response=await fetch(`/auth/logout`);
     
     if(response.ok ){
     //  const data=await response.json();
       resolve({data:"success"})
     }else{
       const err=await response.text();
       reject(err)
     }
 
   }
   catch(err){
     reject(err)
   }
    }
   );
}