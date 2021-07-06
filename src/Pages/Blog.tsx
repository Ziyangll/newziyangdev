import { useParams } from "react-router-dom";
export default function Blog() {
  let { blogId } = useParams() as any;
  return (
    <div className='page-container'>
      <h1 className='white'>{blogId}</h1>
    </div>
  );
}
