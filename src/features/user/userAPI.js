
export function fetchLoggedInUser() {
  return new Promise( async(resolve) =>{
  try {
    let response=await fetch("/users/own")
    const data=await response.json();
    resolve({data});
  } catch (error) {
    console.log("error",error);
  }
  }
  );
}


export function fetchLoggedInUserOrders() {
  return new Promise( async(resolve) =>{
    let response=await fetch("/orders/own")
     const data=await response.json();
     
     resolve({data});
  }
  );
}

export  function updateUser(userData) {
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch("/users/"+userData.id,{
      method:"PATCH",
      body:JSON.stringify(userData),
      headers:{"content-type":"application/json"}
    })
     const data=await response.json();
     resolve({data});
  }
  catch(e){
    console.log(e);
  }
   }
  );
}

