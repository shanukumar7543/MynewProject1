// import VideoBack from "../components/VideoBack"

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  // const router = useRouter();

  return (
    <>
      {/* <VideoBack /> */}
      <Main
        meta={
          <Meta
            title="VidyChat"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      />
    </>
  );
};

export default Index;
