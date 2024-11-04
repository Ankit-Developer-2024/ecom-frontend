import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { erors },
  } = useForm();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAdressForm, setShowAdressForm] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();


  const handleEdit = (e, addressUpdateData, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue we do for address
    newUser.addresses.splice(index, 1, addressUpdateData);
    dispatch(updateUserAsync(newUser));
    setSelectedIndex(-1);
  };

  const handleAdd=(data)=>{
    const newUser = { ...userInfo, addresses: [...userInfo.addresses,data] }; // for shallow copy issue we do for address
    dispatch(updateUserAsync(newUser));
    setShowAdressForm(false)
  }

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }; // for shallow copy issue we do for address
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleEditForm = (index) => {
    setShowAdressForm(false);
    setSelectedIndex(index);
    const address = userInfo.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("State", address.State);
    setValue("pincode", address.pincode);
    setValue("phone",address.phone)
  };

  return (
    <>
      <div>
        <div>
          <div className="mx-12 mt-6 bg-white mx-w-7xl  px-4 sm:px-6 lg:px-8">
            <h1 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Name : {userInfo.name ? userInfo.name : "New User"}
            </h1>
            <h3 className=" text-xl font-bold leading-9 tracking-tight text-red-900">
              Email Address: {userInfo.email}
            </h3>
            {userInfo.role==="admin" ? <h3 className=" text-xl font-bold leading-9 tracking-tight text-red-900">
              User Role: {userInfo.role}
            </h3> : null}
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <button
                type="submit"
                onClick={e=>{setShowAdressForm(true);setSelectedIndex(-1)}}
                className="rounded-md mb-3 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Add New Address
              </button>

              {showAdressForm  ? (
                        <form
                          noValidate
                          action="#"
                          onSubmit={handleSubmit((data) => {
                            handleAdd(data);
                            reset();
                          })}
                        >
                          <div className="space-y-12 bg-white">
                            <div className="border-b  border-gray-900/10 pb-12">
                              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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

                            <div className=" flex items-center justify-end ">
                              <button
                                type="button"
                                onClick={(e) => setShowAdressForm(false)}
                                className="rounded-md mb-3 mr-3 bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md mb-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Add Address
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : null}




              <p className="mt-0.5 mb-1 text-sm text-gray-500">
                Your Addresses:
              </p>

              {userInfo.addresses.length>0 && userInfo.addresses.map((address, index) => {
                return (
                  <>
                    <div>
                      {selectedIndex === index ? (
                        <form
                          noValidate
                          action="#"
                          onSubmit={handleSubmit((data) => {
                            handleEdit(data, index);
                            reset();
                          })}
                        >
                          <div className="space-y-12 bg-white">
                            <div className="border-b  border-gray-900/10 pb-12">
                              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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
                                    className="block text-sm font-medium leading-6 text-gray-900"
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

                            <div className=" flex items-center justify-end ">
                              <button
                                type="button"
                                onClick={(e) => setSelectedIndex(-1)}
                                className="rounded-md mb-3 mr-3 bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md mb-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit Address
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : null}
                      <div
                        key={index}
                        className="flex justify-between mb-2 gap-x-6 p-5 border-2 border-gray-400"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-xl font-semibold  leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
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
                        <div className="hidden shrink-0 sm:flex mr-2 sm:flex-col sm:items-end">
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <button
                              type="button"
                              onClick={() => handleEditForm(index)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="mt-1 flex items-center gap-x-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleRemove(e, index)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
