// import Link from "next/link";

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Blog = () => (
  <Main meta={<Meta title="Lorem ipsum" description="Lorem ipsum" />}>
    <img
      src="https://www.impactplus.com/hs-fs/hubfs/blog-image-uploads/best-about-us-pages.jpg?length=1200&name=best-about-us-pages.jpg"
      alt="Nextjs starter banner"
    />
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat iure
      dolorem consectetur laboriosam rerum dolore doloribus asperiores itaque
      esse vitae. Reiciendis, modi fugit tempora unde voluptatum nihil iusto
      deserunt totam. ipsum dolor sit amet consectetur, adipisicing elit.
      Ratione fuga recusandae quidem. Quaerat molestiae blanditiis doloremque
      possimus labore voluptatibus distinctio recusandae autem esse explicabo
      molestias officia placeat, accusamus aut saepe.
    </p>

    {/* {Array.from(Array(10).keys()).map((elt) => (
      <div
        className="my-4 w-full rounded-md border-2 border-gray-400 px-2 py-1"
        key={elt}
      >
        <Link href={`/blog/blog-${elt}`}>{`Blog - ${elt}`}</Link>
      </div>
    ))} */}
  </Main>
);

export default Blog;
