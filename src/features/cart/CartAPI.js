
export  function addToCart(newItem) {
  return new Promise( async(resolve) =>{

   try{
    let response=await fetch("/cart",{
      method:"POST",
      body:JSON.stringify(newItem),
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

export function fetchItemByUserId() {
  return new Promise( async(resolve) =>{
    let response=await fetch("/cart")
     const data=await response.json();
     resolve({data});
  }
  );
}



export  function updateToCart(update) {     
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch(`/cart/${update.id}`,{
      method:"PATCH",
      body:JSON.stringify(update),
      headers:{"content-type":"application/json"}
    })
     const data=response.json();
      resolve({data});
  }
  catch(e){
    console.log("api error",e);
    
  }
   }
  );
}


export  function deleteItemToCart(itemId) {
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch(`/cart/${itemId}`,{
      method:"DELETE",
      headers:{"content-type":"application/json"}
    })
     const data=response.json();
     resolve({data:{id:itemId}});
  }
  catch(e){
    console.log("api error",e); 
  }
   }
  );
}


export  function resetCart() {
  //get all item of user's cart and delete that item
  return new Promise( async(resolve) =>{
   try{
    
    let response=await fetchItemByUserId();
    let items =response.data;
    for(let item of items ){
        await deleteItemToCart(item.id);
    }

    resolve({status:"Success"})
  }
  catch(e){
    console.log("api error",e);
    
  }
   }
  );
}