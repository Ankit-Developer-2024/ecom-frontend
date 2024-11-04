import { useSelector, useDispatch } from 'react-redux';
import {
  selectedOrders
} from './orderSlice';

export default function Order() {
  const count = useSelector(selectedOrders);
  const dispatch = useDispatch();


  return (
    <div>
   
    </div>
  );
}
