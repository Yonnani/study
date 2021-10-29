import DisplayNumber from '../components/DisplayNumber.jsx';
import {connect} from 'react-redux';
function mapReduxStateToReactProps(state) {
  return {
    number: state.number
  };
}
export default connect(mapReduxStateToReactProps)(DisplayNumber);
// import { useState } from 'react';
// import store from "../store";

// export default function DisplayNumberContainer() {
//   const [number] = useState(store.getState().number);

//   return (
//     <DisplayNumber number={number}></DisplayNumber>
//   );
// }