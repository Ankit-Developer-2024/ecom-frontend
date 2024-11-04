
export function fetchOrder() {
  return new Promise( async(resolve) =>{
    let response=await fetch("/orders")
     const data=await response.json();
     resolve({data});
  }
  );
}


export  function createOrder(order) {
  return new Promise( async(resolve,reject) =>{
   try{
    let response=await fetch("/orders",{
      method:"POST",
      body:JSON.stringify(order),
      headers:{"content-type":"application/json"}
    })
      
    if(response.status===200 || response.status===201){
      const data=await response.json();
      resolve({data});
    }
    else{
      const data=await response.json();
      reject({data}); 
    }

  }
  catch(e){
    reject({e})
  }
   }
  );
}

export function fetchAllOrders(sort,pagination) {
 
   //pagination:{_page:1,_limit:10}
  
  let queryString="";

  for( let key in sort){
    queryString+=`${key}=${sort[key]}&`;
  }
  
  
  
  for( let key in pagination){
    queryString+=`${key}=${pagination[key]}&`;
  }

  return new Promise( async(resolve) =>{
  
    let response=await fetch(`/orders?${queryString}`);
    const data=await response.json();
    const totalOrders=await response.headers.get('X-Total-Count')

    resolve({data:{data:data,totalOrders:+totalOrders}});
  }
  );
}



export  function updateOrder(order) {
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch("/orders/"+order.id,{   //need to verify
      method:"PATCH",
      body:JSON.stringify(order),
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



