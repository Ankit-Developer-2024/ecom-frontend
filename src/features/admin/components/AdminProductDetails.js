import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAsync, selectItems } from "../../cart/CartSlice";
import { discountPrice } from "../../../app/constant";
import { useAlert } from "react-alert";
import { FallingLines } from "react-loader-spinner";
import { fetchProductByIdAsync, selectProductById, selectProductsLoading } from "../../product/productSlice";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminProductDetails() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const product = useSelector(selectProductById);
  const items = useSelector(selectItems);
   let loading=useSelector(selectProductsLoading)
  const dispatch = useDispatch();
  const param = useParams();
  const alert = useAlert();

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      let newItem = {
        product: product.id,
        quantity: 1,
      };
      
      if(selectedColor){
        newItem.colors=selectedColor
      }
      if(selectedSize){
        newItem.colors=selectedSize
      }
      dispatch(addToCartAsync({newItem,alert}));
    } else {
      alert.error("Item already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(param.id));
  }, [dispatch, param.id]);

  return (
    <div className="bg-white m-auto">
      {loading !=="loading" ?(
        product && (
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li key={product.id}>
                  <div className="flex items-center">
                    <a
                      href={product.thumbnail}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {product.title}
                    </a>
                  </div>
                </li>

                <li className="text-sm">
                  <a
                    href={product.thumbnail}
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product.title}
                  </a>
                </li>
              </ol>
            </nav>

            {/* Image gallery */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  alt={product.title}
                  src={product.images[0]}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt={product.title}
                    src={product.images[1] ?? product.images[0]}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    alt={product.title}
                    src={product.images[1] ?? product.images[0]}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  alt={product.title}
                  src={product.images[1] ?? product.images[0]}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-xl tracking-tight line-through text-gray-900">
                  ${product.price}
                </p>
                <p className="text-3xl tracking-tight text-gray-900">
                  ${discountPrice(product).toFixed(2)}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product.rating > rating
                              ? "text-gray-900"
                              : "text-gray-200",
                            "h-5 w-5 flex-shrink-0"
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                 { product.colors && product.colors.length>0 && <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset aria-label="Choose a color" className="mt-4">
                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="flex items-center space-x-3"
                      >
                        {product.colors &&
                          product.colors.map((color) => (
                            <Radio
                              key={color.name}
                              value={color}
                              aria-label={color.name}
                              className={classNames(
                                color.selectedClass,
                                "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color.class,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </Radio>
                          ))}
                      </RadioGroup>
                    </fieldset>
                  </div>}

                  {/* Sizes */}
                  {product.sizes && product.sizes.length>0 &&  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <fieldset aria-label="Choose a size" className="mt-4">
                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                      >
                        {product.sizes &&
                          product.sizes.map((size) => (
                            <Radio
                              key={size.name}
                              value={size}
                              disabled={!size.inStock}
                              className={classNames(
                                size.inStock
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                              )}
                            >
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    stroke="currentColor"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  >
                                    <line
                                      x1={0}
                                      x2={100}
                                      y1={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </Radio>
                          ))}
                      </RadioGroup>
                    </fieldset>
                  </div>}

                  <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to cart
                  </button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

            {product.highlights && product.highlights.length>0 &&    <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Highlights</h2>

                  <div className="mt-4 ">
                    <ul  className="list-disc space-y-2 pl-4 text-sm">
                    {   product.highlights.map((highlight)=>(
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                       ))}
                    </ul>
                  </div>
                </div>}

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div>
          <FallingLines
            color="rgb(79, 70, 229)"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
    </div>
  );
}
