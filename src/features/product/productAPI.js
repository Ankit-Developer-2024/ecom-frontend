export function fetchProductById(id) {  
  return new Promise( async(resolve) =>{
    let response=await fetch("/products/"+id)
     const data=await response.json();
     resolve({data});
  }
  );
}


export function createProduct(product) {  
  return new Promise( async(resolve) =>{
    let response=await fetch("/products",{
      method:"POST",
      body:JSON.stringify(product),
      headers:{"content-type":"application/json"}
    })
     const data=await response.json();
     resolve({data});
  }
  );
}

export  function updateToProduct(product) {         //TODO // need to do verfiy
  return new Promise( async(resolve) =>{
   try{
    let response=await fetch(`/products/${product.id}`,{
      method:"PATCH",
      body:JSON.stringify(product),
      headers:{"content-type":"application/json"}
    })
     const data=await response.json();
      resolve({data});
  }
  catch(e){
    console.log("api error",e);
    
  }
   }
  );
}



export function fetchProductByFilter(filter,sort,pagination,admin) {
  //filter: {"category":["beauty","laptop"]}
   //sort :{_sort:"price",_order:"asc"}
   //pagination:{_page:1,_limit:10}
  let queryString="";
  for(let key in filter){
    const categoryValue=filter[key];
    if(categoryValue.length>0){
     // const lastCategoryValue=categoryValue[categoryValue.length-1];
      queryString+=`${key}=${categoryValue}&`;
    }
    
  }
  
  for( let key in pagination){
    queryString+=`${key}=${pagination[key]}&`;
  }
  
  
  for( let key in sort){
    queryString+=`${key}=${sort[key]}&`;
  }

  if (admin) {
    queryString+=`admin=true`;
  }
    
  return new Promise( async(resolve) =>{
    let response=await fetch(`/products?${queryString}`);
     const data=await response.json();
     const totalItems=await response.headers.get("X-Total-Count");
        
        resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}


export function fetchBrands() {
  return new Promise( async(resolve) =>{
    let response=await fetch("/brands")
     const data=await response.json();
     resolve({data});
  }
  );
}


export function fetchCatgeories() {
  return new Promise( async(resolve) =>{
    let response=await fetch("/categories")
     const data=await response.json();
     resolve({data});
  }
  );
}