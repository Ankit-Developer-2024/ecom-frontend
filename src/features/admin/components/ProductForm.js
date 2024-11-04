import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProduct,
  createProductAsync,
  selectBrands,
  selectCategories,
  updateToProductAsync,
} from "../../product/productSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProductByIdAsync,
  selectProductById,
} from "../../product/productSlice";
import AlertDialog from "../../common/AlertDialog";

export default function AdminProductForm() {
  const dispatch = useDispatch();
  let brands = useSelector(selectBrands);
  let categories = useSelector(selectCategories);
  let selectProduct = useSelector(selectProductById);
  let [showDialog,setShowDialog]=useState(null)
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const param = useParams();

  let colors = [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400",id:"white" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400",id:"gray" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900",id:"black" },
  ];


  let sizes = [
    { name: "XXS", inStock: true,id:"xxs" },
    { name: "XS", inStock: true,id:"xs" },
    { name: "S", inStock: true,id:"s" },
    { name: "M", inStock: true,id:"m" },
    { name: "L", inStock: true ,id:"l"},
    { name: "XL", inStock: true,id:"xl" },
    { name: "2XL", inStock: true,id:"2xl"},
    { name: "3XL", inStock: true ,id:"3xl"},
  ];
  


  const handleDelete = () => {
    const product = { ...selectProduct };
    product.deleted = true;
    dispatch(updateToProductAsync(product));
  };

  useEffect(() => {
    if (param.id) {
      dispatch(fetchProductByIdAsync(param.id));
    } else dispatch(clearSelectedProduct());
  }, [param.id, dispatch]);

  useEffect(() => {
    if (selectProduct && param.id) {
      selectProduct = selectProduct[0]===undefined ? selectProduct :selectProduct[0];
      setValue("title", selectProduct.title);
      setValue("description", selectProduct.description);
      setValue("brand", selectProduct.brand);
      setValue("category", selectProduct.category);
      setValue("price", selectProduct.price);
      setValue("stock", selectProduct.stock);
      setValue("discountPercentage", selectProduct.discountPercentage);
      setValue("thumbnail", selectProduct.thumbnail);
      setValue("image1", (selectProduct.images.length>0 && selectProduct.images[0]) && selectProduct.images[0]);
      setValue("image2",(selectProduct.images.length>1 && selectProduct.images[1]) &&  selectProduct.images[1]);
      setValue("image3",(selectProduct.images.length>2 && selectProduct.images[2]) &&  selectProduct.images[2]);
      setValue("highlight1",(selectProduct.highlights.length>0 && selectProduct.highlights[0]) &&  selectProduct.highlights[0]);
      setValue("highlight2",(selectProduct.highlights.length>1 && selectProduct.highlights[1]) &&  selectProduct.highlights[1]);
      setValue("highlight3",(selectProduct.highlights.length>2 && selectProduct.highlights[2]) &&  selectProduct.highlights[2]);
      setValue("highlight4",(selectProduct.highlights.length>3 && selectProduct.highlights[3]) &&  selectProduct.highlights[3]);
      setValue("sizes",selectProduct.sizes.map(size=>size.id));
      setValue("colors",selectProduct.colors.map(color=>color.id));
    }
  }, [selectProduct, setValue, param.id]);

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit((data) => {
            const product = { ...data };
            product.images = [
              product.thumbnail,
              product.image1,
              product.image2,
              product.image3,
            ];
            product.highlights = [
              product.highlight1,
              product.highlight2,
              product.highlight3,
              product.highlight4,
            ];

            product.rating = 0;
            product.colors=product.colors.map(color=>colors.find(clr=>clr.id===color))
            product.colors=product.sizes.map(size=>sizes.find(siz=>siz.id===size))
            delete product["image1"];
            delete product["image2"];
            delete product["image3"];
            product.price = +product.price;
            product.stock = +product.stock;
            product.discountPercentage = +product.discountPercentage;

            if (param.id) {
              product.id = param.id;
              product.rating = selectProduct.rating || 0;
              dispatch(updateToProductAsync(product));
              reset();
            } else {
              dispatch(createProductAsync(product));
              reset();
            }
          })}
        >
          <div className="space-y-12 bg-white p-4">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Add Product
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Product Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="title"
                        {...register("title", { required: "Name is required" })}
                        type="text"
                        placeholder="Product Name"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about product.
                  </p>
                </div>
                

                {/* Brand */}
                <div className="col-span-full">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("brand", { required: "Brand is required" })}
                    >
                      <option value="">--Choose Brand--</option>
                      {brands.map((brand) => {
                        return (
                          <option value={brand.value}>{brand.label}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                {/* colors */}
                <div className="col-span-full">
                  <label
                    htmlFor="colors"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Colors
                  </label>
                  <div className="mt-2">
                
          
                      {colors.map((color) => {
                        return (
                          <>
                          <input
                          {...register("colors")}
                          type="checkbox" key={color.id} value={color.id} />{color.name}
                          </>
                        );
                      })}
              
                  </div>
                </div>

                {/* Size */}
                <div className="col-span-full">
                  <label
                    htmlFor="sizes"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sizes
                  </label>
                  <div className="mt-2">
                
          
                      {sizes.map((size) => {
                        return (
                          <>
                          <input
                          {...register("sizes")}
                          type="checkbox" key={size.id} value={size.id} />{size.name}
                          </>
                        );
                      })}
              
                  </div>
                </div>


                <div className="col-span-full">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("category", {
                        required: "Category is required",
                      })}
                    >
                      <option value="">--Choose Category--</option>
                      {categories.map((category) => {
                        return (
                          <option value={category.value}>
                            {category.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="price"
                        {...register("price", {
                          required: "Price is required",
                          min: 1,
                        })}
                        type="number"
                        autoComplete="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="discountPercentage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Discount
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="discountPercentage"
                        {...register("discountPercentage", {
                          required: "DiscountPercentage is required",
                          min: 0,
                          max: 100,
                        })}
                        type="number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stock
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="stock"
                        {...register("stock", {
                          required: "Stock is required",
                          min: 0,
                        })}
                        type="number"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Thumbnail
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="thumbnail"
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="image1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="image1"
                        {...register("image1", {
                          required: "Image 1 is required",
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="image2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="image2"
                        {...register("image2", {
                          required: "Image 2 is required",
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                  {/* image 3 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="image3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="image3"
                        {...register("image3", {
                          required: "Image 3  is required",
                        })}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {/* highlight1 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlight1"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 1
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="highlight1"
                        {...register("highlight1")}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {/* highlight2 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlight2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 2
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="highlight2"
                        {...register("highlight2")}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {/* highlight3 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlight3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 3
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="highlight3"
                        {...register("highlight3")}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                {/* highlight4 */}
                <div className="sm:col-span-6">
                  <label
                    htmlFor="highlight4"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Highlight 4
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                      <input
                        id="highlight4"
                        {...register("highlight4")}
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Extra
              </h2>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    By Email
                  </legend>
                  <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="comments"
                          name="comments"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          Comments
                        </label>
                        <p className="text-gray-500">
                          Get notified when someones posts a comment on a
                          posting.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="candidates"
                          name="candidates"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="candidates"
                          className="font-medium text-gray-900"
                        >
                          Candidates
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate applies for a job.
                        </p>
                      </div>
                    </div>
                    <div className="relative flex gap-x-3">
                      <div className="flex h-6 items-center">
                        <input
                          id="offers"
                          name="offers"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="offers"
                          className="font-medium text-gray-900"
                        >
                          Offers
                        </label>
                        <p className="text-gray-500">
                          Get notified when a candidate accepts or rejects an
                          offer.
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <AlertDialog
              title={`Delete product`}
              message="Are you sure you want to delete product?"
              takeAction="Delete"
              cancelOption="Cancel"
              action={(e) => {
                handleDelete();
                setShowDialog(null);
              }}
              cancelAction={(e) => {
                setShowDialog(null);
              }}
              showDialog={showDialog}
            ></AlertDialog>
           { param.id && <button
              type="submit"
              onClick={e=>{e.preventDefault(); setShowDialog(true)}}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>}
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
