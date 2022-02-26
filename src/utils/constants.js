export const ToolbarConfig = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link"],
  ["clean"],
  [{ color: [] }],
  [{ background: [] }],
];

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://todo-master-backend.herokuapp.com";
