import { useParams } from "react-router-dom";
export default function Blog() {
  let { blogId } = useParams() as any;
  return <h3>topic ID: {blogId}</h3>;
}
