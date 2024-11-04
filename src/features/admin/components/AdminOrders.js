import { useEffect, useState } from "react";
import { discountPrice, ITEM_PER_PAGE } from "../../../app/constant";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon , PencilIcon, ArrowDownIcon,ArrowUpIcon} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectedOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import Pagination from "../../common/Pagination";

export default function AdminOrders() {
  const dispatch = useDispatch();
  let [page, setPage] = useState(1);
  let [sort,setSort]=useState({}); 
  let [editableOrderId, setEditableOrderId] = useState(-1);
  let orders = useSelector(selectedOrders);
  let totalOrders = useSelector(selectTotalOrders);

  const handleShow =(order)=>{

  }

  const handleSort =(field)=>{
    let data={_sort:field.sort, _order:field.order}
    setSort(data);
  }


  const handleEdit =(order)=>{
    setEditableOrderId(order.id)
  }
 
  const handleUpdateStatus=(e,order)=>{
         const updateOrder={...order,status:e.target.value}
         dispatch(updateOrderAsync(updateOrder))
         setEditableOrderId(-1)
  }

  function chooseStatusColor(status) {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600"
      case "dispatched":
         return "bg-yellow-200 text-yellow-600"
      case "delivered":
         return "bg-green-200 text-green-600"
      case "cancelled":
         return "bg-red-200 text-red-600"
    
      default:
        return "bg-purple-200 text-purple-600"
    }
  }

  const handlePage =(page)=>{
    setPage(page)
   
  }

    
  useEffect(() => {
    let pagination = { _page: page,_limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({sort,pagination}));
  }, [dispatch, page,sort]);



  return (
    <>
      <div>
        <div className="overflow-x-auto">
          <div className=" bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-2 text-left cursor-pointer"
                       onClick={(e)=>handleSort({sort:'id',order:sort._order==="asc"?"desc" : "asc"})}
                       >
                        Order# { (sort._sort==="id" && sort._order==="asc" )? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>: <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon> }
                       </th>
                      <th className="py-3 px-2 text-left">Items</th>
                      <th className="py-3 px-2 text-left cursor-pointer"
                       onClick={(e)=>handleSort({sort:'totalAmount',order:sort._order==="asc"?"desc" : "asc"})}
                       >
                        Total Amount# { (sort._sort==="totalAmount" && sort._order==="asc" )? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>: <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon> }
                       </th>
                      <th className="py-3 px-2 text-center">Shipping Address</th>
                      <th className="py-3 px-2 text-center">Status</th>
                      <th className="py-3 px-2 text-center"
                         onClick={(e)=>handleSort({sort:'createdAt',order:sort._order==="asc"?"desc" : "asc"})}
                      >Order Time  { (sort._sort==="createdAt" && sort._order==="asc" )? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>: <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon> }
                      </th>
                      <th className="py-3 px-2 text-center"
                        onClick={(e)=>handleSort({sort:'updatedAt',order:sort._order==="asc"?"desc" : "asc"})}
                      >Last Updated { (sort._sort==="updatedAt" && sort._order==="asc" )? <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>: <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon> }
                      </th>
                      <th className="py-3 px-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders &&
                      orders.map((order) => {
                        return (
                          <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-2 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {order.id}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-left">
                             {order.items.map((item)=><div key={item.id}  className="flex items-center">
                                <div className="mr-2">
                                  <img
                                    className="w-6 h-6 rounded-full"
                                    src={item.product.thumbnail}
                                  />
                                </div>
                                <span>{item.product.title} - #{item.quantity} - {discountPrice(item.product).toFixed(2)}</span>
                              </div>) }
                            </td>
                            <td className="py-3 px-2 text-center">
                                <div className="flex items-center justify-center">
                              <h1>${order.totalAmount.toFixed(2)}</h1>
                              </div>
                            </td>
                            <td className="py-2 px-2 text-center">
                            <div >
                                <div><strong>{order.selectedAddress.name} </strong> </div>
                                <div>{order.selectedAddress.street}</div>,
                                <div>{order.selectedAddress.city}</div>,
                                <div>{order.selectedAddress.State}</div>,
                                <div>{order.selectedAddress.pincode}</div>,
                                <div>{order.selectedAddress.phone}</div>
                                </div>
                            </td>
                            <td className="py-3 px-2 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                  {order.createdAt ? new Date(order.createdAt ).toLocaleString :null}                          
                              </div>
                            </td>
                            <td className="py-3 px-2 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                  {order.updatedAt ? new Date(order.updatedAt ).toLocaleString :null}                          
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center">
                           { order.id===editableOrderId ? 
                                (
                                  <select onChange={(e)=>handleUpdateStatus(e,order)}>
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                                )
                             :(
                              <span className={`${chooseStatusColor(order.status)} py-1 px-3 uppercase rounded-full text-xs`}>
                                {order.status}
                              </span>
                             ) }
                            </td>
                            <td className="py-3 px-2 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                               <EyeIcon className="w-8 h-8" onClick={e=>handleShow(order)}></EyeIcon>
                                </div>
                                <div className="w-8 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <PencilIcon className="w-8 h-8" onClick={e=>handleEdit(order)}></PencilIcon>
                                </div>
                          
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItem={totalOrders}></Pagination>

      </div>
    </>
  );
}
