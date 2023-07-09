import Animator from "../components/animator/animator";
import FooterHorizontal from "../components/footer/footer";
import HeaderHorizontal from "../components/header/header";
import BlogList from "../components/home/blogList";
import SearchBar from "../components/searchBar/searchbar";
import H1 from "../components/setup/h1";
import H3 from "../components/setup/h3";


export default function Home() {
  return (
    <>
    <HeaderHorizontal/>
   <main className="home">
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
<SearchBar/>
    </Animator>
    
    <Animator index={3}>
      <BlogList/>
    </Animator>
   </main> 
   <FooterHorizontal/>
   </>
  )
}
