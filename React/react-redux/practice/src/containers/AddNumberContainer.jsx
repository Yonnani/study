import { connect } from "react-redux";
import AddNumber from "../components/AddNumber";

function mapDispatchToProps(dispatch) {
  return {
    onClick: function (size) {
      dispatch({ type:'INCREMENT', size: size });
    }
  };
}
export default connect(null, mapDispatchToProps)(AddNumber);

// import store from "../store";

// export default function AddNumberContainer () {
//   return (
//     <AddNumber onClick={function (size) {
//       store.dispatch({ type:'INCREMENT', size: size });
//     }}></AddNumber>
//   );
// }