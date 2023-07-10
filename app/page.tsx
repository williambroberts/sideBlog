import Animator from "../components/animator/animator";
import FooterHorizontal from "../components/footer/footer";
import HeaderHorizontal from "../components/header/header";
import BlogList from "../components/home/blogList";
import FetchMoreBlogs from "../components/home/fetchMore";
import GetBlogsComponent from "../components/home/getBlogs";
import GetLatest from "../components/home/getLatest";
import SearchBar from "../components/searchBar/searchbar";
import H1 from "../components/setup/h1";
import H3 from "../components/setup/h3";


export default function Home() {
  return (
    <>
    <HeaderHorizontal/>
   <main className="page">
    <GetBlogsComponent/>
    <Animator index={1}
    alignItems="flex-start"
    >
      <H1>
        Blog
      </H1>
    </Animator>
    <Animator index={2}
    alignItems="flex-start"
    >
    <div className="text-[var(--t-3)] 
    font-normal 
    tracking-tight
    ">
      Blog posts about code, design, development and more...
      </div>
    </Animator>

    <Animator index={2}
    alignItems="flex-start"
    >
<SearchBar

/>
    </Animator >
    <Animator index={3}
    alignItems="flex-start"
    >
      <GetLatest/>
    </Animator>
    <Animator index={4}
    alignItems="flex-start">
      <BlogList/>
    </Animator>
    <Animator index={5}
    alignItems="flex-start">
      <FetchMoreBlogs/>
    </Animator>
   </main> 
   <FooterHorizontal/>
   </>
  )
}
