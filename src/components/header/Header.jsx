import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import "./style.scss";
import { useEffect, useState } from "react";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [show, setShow] = useState("top");
  const [lastScrollY , setLastScrollY] = useState(0)
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  const scrollHandler = () =>{
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
      }else{
        setShow("show")
      }
    }else{
      setShow("top")
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll" ,scrollHandler);
    return () =>{
      window.removeEventListener("scroll" ,scrollHandler)
    }
  },[lastScrollY])

  const openMobileMenu = () => {
    setSearch(false);
    setMobileMenu(true);
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const openSearchMenu = () => {
    setMobileMenu(false);
    setSearch(true);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate(`/explore/movie`);
    } else {
      navigate(`/explore/tv`);
    }
    setMobileMenu(false);
    setSearch(false);

  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" onClick={()=>{navigate('/')}} />
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigationHandler("tv");
            }}
          >
            Tv Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearchMenu} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearchMenu} />
          {mobileMenu ? (
            <VscChromeClose
              onClick={() => {
                setMobileMenu(false);
              }}
            />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {search ? (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => {
                  setSearch(false);
                }}
              />
            </div>
          </ContentWrapper>
        </div>
      ) : (
        ""
      )}
    </header>
  );
};

export default Header;

//2:37:30 H:M:S
