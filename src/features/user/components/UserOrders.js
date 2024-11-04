import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { useEffect } from 'react';
import { discountPrice } from '../../../app/constant';

export default function UserOrders() {
  const userOrders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrdersAsync())
  },[dispatch])


  return (
   <>
   <div>
    {
     userOrders&& userOrders.map((order)=>(
      <div key={order.id}>
           <div className="mx-12 mt-6 bg-white mx-w-7xl  px-4 sm:px-6 lg:px-8">
          <h1 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Order #{order.id}
          </h1>
          <h3 className=" text-xl font-bold leading-9 tracking-tight text-red-900">
            Order status : {order.status}
          </h3>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {order.items.map((product) => (
              <li key={product.product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.product.title}
                    src={product.product.thumbnail}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.product.id}>{product.product.title}</a>
                      </h3>
                      <p className="ml-4">${discountPrice(product.product)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.product.brand}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500 ">Qty:{product.quantity} </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${order.totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
          <p>Total items in cart</p>
          <p>{order.totalItems} items</p>
        </div>
        <p className="mt-0.5 mb-1 text-sm text-gray-500">
          Shipping Address.
        </p>
        <div className="flex justify-between mb-2 gap-x-6 p-5 border-2 border-gray-400">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-xl font-semibold  leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.city}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex mr-2 sm:flex-col sm:items-end">
              <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xl leading-5 font-semibold text-gray-900">Phone:</p>
                <p className="text-xs leading-5 text-gray-500">{order.selectedAddress.phone}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-1.5">
                <p className="text-xs leading-5 text-gray-500">{order.selectedAddress.pincode}</p>
              </div>
          
          </div>
        </div>
      </div>
    </div>
      </div>
      ))
    }
   </div>
   </>
  );
}
