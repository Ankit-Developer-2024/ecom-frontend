export const ITEM_PER_PAGE=10;
export function discountPrice(item) {
    let price=item.price;
    let disPrice=item.price*(item.discountPercentage/100);
    //  console.log(Math.round(item.price*(1-item.discountPercentage/100),2));
    return price-disPrice
  
}