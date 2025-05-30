import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {fetchCategoriesAsync, 
  fetchBrandsAsync,
  fetchProductByFilterAsync, 
  selectAllProducts, 
  selectBrands, 
  selectCategories, 
  selectProductsLoading,
   selectTotalItems } from "../productSlice";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon,  } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
//import { handler } from "@tailwindcss/aspect-ratio";
import { discountPrice, ITEM_PER_PAGE } from "../../../app/constant";
import Pagination from "../../common/Pagination";
import { FallingLines } from "react-loader-spinner";

const sortOptions = [
  { name: "Best Rating", sort: "rating",order:"desc", current: false },
  { name: "Price: Low to High", sort: "price", order:"asc",current: false },
  { name: "Price: High to Low", sort: "price",order:"desc", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Product() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  let [filter,setFilter]=useState({}); 
  let [sort,setSort]=useState({}); 
  let [page,setPage]=useState(1);
  let products=useSelector(selectAllProducts);
  let brands=useSelector(selectBrands);
  let categories=useSelector(selectCategories);
  let totalItems=useSelector(selectTotalItems)
  let loading=useSelector(selectProductsLoading)

  
const filters = [
  {
    id: "brand",
    name: "Brand",
    options: brands
  },
  {
    id: "category",
    name: "Category",
    options: categories
  },

];


 
  const handleFilter=(e,section,option)=>{
    let newFilter={...filter};
       if(e.target.checked){
        if(newFilter[section.id]){
          newFilter[section.id].push(option.value)
        }
         else{
          newFilter[section.id]=[option.value]
         }
       }
       else{
        let index =newFilter[section.id].findIndex(el=>el===option.value)
        newFilter[section.id].splice(index,1)
       }
       setFilter(newFilter);
       
       
  };

  const handleSort=(e,sort)=>{
    let data={_sort:sort.sort, _order:sort.order}
    setSort(data);
};

const handlePage=(page)=>{ 
  setPage(page);
};

useEffect(()=>{
  dispatch(fetchCategoriesAsync())
  dispatch(fetchBrandsAsync())
  let pagination={_page:page,_limit:ITEM_PER_PAGE};
  dispatch(fetchProductByFilterAsync({filter,sort,pagination}))
 
 
},[dispatch,filter,sort,page])

  return (
    <div>
      <div className="bg-white">
    
        <div>
          {/* Mobile filter dialog */}
         <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          handleFilter={handleFilter}
         ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All Products
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <p
                           onClick={e=>handleSort(e,option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}
                          >
                            {option.name}
                          </p>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
             <DesktopFilter handleFilter={handleFilter} filters={filters}></DesktopFilter>

                {/* Product grid */}
                <ProductGrid products={products} loading={loading} ></ProductGrid>
                {/* Product grid End */}
              </div>
            </section>

            {/* Pagination-------- */}
            <Pagination handlePage={handlePage} page={page} setPage={setPage} totalItem={totalItems}></Pagination>

          </main>
        </div>
      </div>

      
    </div>
  );
}







function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,filters,handleFilter}) {
  return(
    <>
     <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className="relative z-40 lg:hidden"
          >
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-40 flex">
              <DialogPanel
                transition
                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                onClick={(e)=>handleFilter(e,section,option)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>
    </>
  );
}



function DesktopFilter({handleFilter,filters}) {
  return (
    <>
       <form className="hidden lg:block">

{filters.map((section) => (
  <Disclosure
    key={section.id}
    as="div"
    className="border-b border-gray-200 py-6"
  >
    <h3 className="-my-3 flow-root">
      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900">
          {section.name}
        </span>
        <span className="ml-6 flex items-center">
          <PlusIcon
            aria-hidden="true"
            className="h-5 w-5 group-data-[open]:hidden"
          />
          <MinusIcon
            aria-hidden="true"
            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
          />
        </span>
      </DisclosureButton>
    </h3>
    <DisclosurePanel className="pt-6">
      <div className="space-y-4">
        {section.options.map((option, optionIdx) => (
          <div
            key={option.value}
            className="flex items-center"
          >
            <input
              defaultValue={option.value}
              defaultChecked={option.checked}
              id={`filter-${section.id}-${optionIdx}`}
              name={`${section.id}[]`}
              type="checkbox"
              onClick={(e)=>handleFilter(e,section,option)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={`filter-${section.id}-${optionIdx}`}
              className="ml-3 text-sm text-gray-600"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </DisclosurePanel>
  </Disclosure>
))}
</form>
    </>
  );
}




function ProductGrid({products,loading}) {
  return (
    <>
    <div className="lg:col-span-3 m-auto">
 
                  {/* This is product list */}
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">

                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                      {
                    
                    loading!=="loading" ?
                      products.map((product,) => (
                          <Link key={product.id} to={`product-detail/${product.id}`}>
                          <div className="group relative border-solid border-2 p-2 border-gray-200">
                            <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                              <img
                                alt={product.title}
                                src={product.thumbnail}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm  text-gray-700">
                                  <div>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                      {product.title.length < 10
                                  ? product.title
                                  : product.title.slice(0, 6).concat("...")}
                                  </div>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  <StarIcon className="w-5 h-5 inline"></StarIcon>
                                  <span className="align-bottom">{product.rating}</span>
                                </p>
                              </div>
                              <div>
                              
                              <p className="text-sm font-medium text-gray-900">
                               $ {discountPrice(product).toFixed(2)}
                              </p>
                              <del className="text-sm font-medium text-gray-400">
                               $ {product.price}
                              </del>
                              </div>
                              
                            </div>
                            {
                              product.stock <= 0 && (
                                <div>
                                  <p className="text-red-600 text-sm">
                                    Out of stock
                                  </p>
                                </div>
                              )
                            }
                          </div>
                          </Link>
                        )) : <div><FallingLines
                          color="rgb(79, 70, 229)"
                          width="100"
                          visible={true}
                          ariaLabel="falling-circles-loading"
                          />
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
    </>
  );
}

