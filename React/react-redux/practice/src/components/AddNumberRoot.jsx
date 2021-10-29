import AddNumber from "../components/AddNumber";

export default function AddNumberRoot(props) {
  return (
    <div>
      <h1>Add Number Root</h1>
      <AddNumber onClick={function (size) {
        props.onClick(size);
      }}></AddNumber>
    </div>
  );
}