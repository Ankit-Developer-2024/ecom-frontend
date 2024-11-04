import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemToCartAsync,
  selectCartLoaded,
  selectItems,
  updateToCartAsync,
} from "./CartSlice";
import { Link, Navigate } from "react-router-dom";
import { discountPrice } from "../../app/constant";
import AlertDialog from "../common/AlertDialog";
import { useState } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded)
  let [showDialog,setShowDialog]=useState(null) 

  let totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  let totalItems = items.reduce((total, item) => item.quantity ?? 1 + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateToCartAsync({ id:item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, item) => {
    dispatch(deleteItemToCartAsync(item.id));
  };
  return (
    <div>
      {!items.length && cartLoaded && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-12 mt-6 bg-white mx-w-7xl  px-4 sm:px-6 lg:px-8">
        <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Cart
        </h2>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((product) => (
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
                          <a href={product.product.href}>{product.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountPrice(product.product).toFixed(2)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 ">
                        Qty
                        <select
                          className="ml-2"
                          value={product.quantity}
                          onChange={(e) => handleQuantity(e, product)}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div>

                      <div className="flex">
                        <AlertDialog
                          title={`Delete ${product.product.title}`}
                          message="Are you sure you want to delete cart item ?"
                          takeAction="Delete"
                          cancelOption="Cancel"
                          action={(e) => {handleRemove(e, product); setShowDialog(null)}}
                          cancelAction={(e)=>{setShowDialog(null)}}
                          showDialog={showDialog===product.id}
                        ></AlertDialog>
                        <button
                          type="button"
                          onClick={e=>{setShowDialog(product.id)}}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
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
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500 text-start">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
