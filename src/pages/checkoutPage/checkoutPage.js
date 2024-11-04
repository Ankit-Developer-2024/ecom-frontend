import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Link, Navigate } from "react-router-dom";
import {
  deleteItemToCartAsync,
  selectItems,
  updateToCartAsync,
} from "../../features/cart/CartSlice";
import {
  createOrderAsync,
  selectcurrentOrder,
  selectStatus,
} from "../../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../../features/user/userSlice";
import { discountPrice } from "../../app/constant";
import { FallingLines } from "react-loader-spinner";
import { useAlert } from "react-alert";


export default function CheckoutPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const user = useSelector(selectUserInfo);
  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectcurrentOrder);
  const status = useSelector(selectStatus);
  const alert = useAlert();

  let totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  let totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateToCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, item) => {
    dispatch(deleteItemToCartAsync(item.id));
  };

  const handleAddress = (e) => {
    let index = +e.target.value;
    setSelectedAddress(user.addresses[index]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
   if(selectedAddress){
    const order = {
      items,
      totalAmount,
      totalItems,
      user: user.id,
      paymentMethod,
      selectedAddress,
      status: "pending",
    }; 
    dispatch(createOrderAsync({order,alert}));
   }else{
    alert.error("Please select the address")
   }
  
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {currentOrder && currentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}

      {status === "loading" ? (
        <div>
          <FallingLines
            color="rgb(79, 70, 229)"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div className="mx-auto bg-white mx-w-7xl mt-2 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <form
                noValidate
                action="#"
                onSubmit={handleSubmit((data) => {
                  dispatch(
                    updateUserAsync({
                      ...user,
                      addresses: [...user.addresses, data],
                    })
                  );
                  reset();
                })}
              >
                <div className="space-y-12 bg-white">
                  <div className="border-b  border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="name"
                          className="block text-start text-sm font-medium leading-6 text-gray-900"
                        >
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...register("name", {
                              required: "Name is Required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "Email is Required",
                            })}
                            type="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone No.
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", {
                              required: "Phone number is Required",
                            })}
                            type="tel"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street-address"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...register("street", {
                              required: "Street-address is Required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", {
                              required: "City is Required",
                            })}
                            type="text"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="region"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          State
                        </label>
                        <div className="mt-2">
                          <input
                            id="region"
                            {...register("State", {
                              required: "State is Required",
                            })}
                            type="text"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pincode"
                          className="block  text-start  text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="pincode"
                            {...register("pincode", {
                              required: "Pincode is Required",
                            })}
                            type="text"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-start text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-start text-sm leading-6 text-gray-600">
                      Choose from existing address
                    </p>

                    <ul role="list">
                      {user.addresses &&
                        user.addresses.map((address, index) => (
                          <li
                            key={index}
                            className="flex justify-between mb-2 gap-x-6 py-5 border-2 border-gray-400"
                          >
                            <div className="flex min-w-0 gap-x-4">
                              <input
                                id="card"
                                onChange={handleAddress}
                                name="address"
                                type="radio"
                                value={index}
                                className="h-4 w-4 ml-2 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              />
                              <div className="min-w-0 flex-auto">
                                <p className="text-xl font-semibold  text-start  leading-6 text-gray-900">
                                  {address.name}
                                </p>
                                <p className="mt-1 truncate text-start text-xs leading-5 text-gray-500">
                                  {address.street}
                                </p>
                                <p className="mt-1 truncate text-start text-xs leading-5 text-gray-500">
                                  {address.city}
                                </p>
                              </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex mr-2 sm:flex-col sm:items-end">
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xl leading-5 font-semibold text-gray-900">
                                  Phone:
                                </p>
                                <p className="text-xs leading-5 text-gray-500">
                                  {address.phone}
                                </p>
                              </div>
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <p className="text-xs leading-5 text-gray-500">
                                  {address.pincode}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-start text-gray-900">
                          Payment Method
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600 text-start">
                          Choose one.
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              value="cash"
                              id="cash"
                              name="payment"
                              type="radio"
                              checked={paymentMethod === "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handlePayment}
                              value="card"
                              id="card"
                              name="payment"
                              type="radio"
                              checked={paymentMethod === "card"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-nothing"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 ">
              <div className="mx-12 mt-6 bg-white mx-w-7xl  px-0 sm:px-6 lg:px-0">
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
                                <h3 className="text-start">
                                  <a href={product.product.href}>
                                    {product.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ${discountPrice(product.product).toFixed(2)}
                                </p>
                              </div>
                              <p className="mt-1 text-start text-sm text-gray-500">
                                {product.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500 ">
                                Qty
                                <select
                                  className="ml-2"
                                  value={items.quantity}
                                  onChange={(e) => handleQuantity(e, product)}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={(e) => handleRemove(e, product)}
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
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </div>
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
          </div>
        </div>
      )}
    </>
  );
}
