import { cn } from "../lib/utils";
import { Avatar } from "../components";
import { ThemeSwitch } from "../components/ui";
import { useState, useEffect, useMemo } from "react";
import "./Hero.css";

export const Hero = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [badgeFiles, setBadgeFiles] = useState<string[]>([]);

  useEffect(() => {
    // Check if mobile with debounce
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 640);
      }, 150);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Set initial theme
    const theme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = theme === "dark" || (!theme && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }

    // Preload both images immediately
    const lightImg = new Image();
    const darkImg = new Image();
    lightImg.src = "/background_light.png";
    darkImg.src = "/background_dark.png";

    // Load badge files
    const badges = [
      "23boyfriend.gif",
      "2aaf3dcb8f0630a5191ec61623806e97bcde73d6.gif",
      "tumblr_inline_pdzcjy1He11v11djx_500.gif",
      "e8cfe8b5be5352bcfcb9ce03a5950e23912d2273.gif",
    ];
    setBadgeFiles(badges);

    // Listen for theme changes
    const handleThemeChange = (e: CustomEvent) => {
      const newIsDark = e.detail.theme === "dark";
      setIsDark(newIsDark);
    };

    window.addEventListener("themeChange", handleThemeChange as EventListener);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener(
        "themeChange",
        handleThemeChange as EventListener
      );
    };
  }, []);

  // Memoize background positions
  const lightBgPosition = useMemo(
    () => (isMobile ? "left center" : "center"),
    [isMobile]
  );
  const darkBgPosition = useMemo(
    () => (isMobile ? "right center" : "center"),
    [isMobile]
  );

  // Anime images
  const animeImages = [
    {
      name: "Naruto",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgudq87-edcb18f9-296d-4373-be75-03c4b1e21c02.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1ZHE4Ny1lZGNiMThmOS0yOTZkLTQzNzMtYmU3NS0wM2M0YjFlMjFjMDIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.P8OljKiZSmKcnVeH3Ziahdd5U-xTdxDK9S8S20mVHbo",
    },
    {
      name: "One Piece",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgu7owv-1dcce753-eb92-4de5-8f7b-953cc9ec6848.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1N293di0xZGNjZTc1My1lYjkyLTRkZTUtOGY3Yi05NTNjYzllYzY4NDguZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VRHCnl9vZn4XjeUSOE-Ym-fXfvzm4OQFp9_10uZLyMM",
    },
    {
      name: "Ponyo",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgudeap-6ce2123a-5496-4186-93e0-67cf78bd103e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1ZGVhcC02Y2UyMTIzYS01NDk2LTQxODYtOTNlMC02N2NmNzhiZDEwM2UuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.J_U8IWIrJnJIn8KuEfoWp1iZ9wu-28_gelOeRnSCyBE",
    },
    {
      name: "Berserk",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgubfsi-977cb053-45be-4816-9a9c-40a62f70824a.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1YmZzaS05NzdjYjA1My00NWJlLTQ4MTYtOWE5Yy00MGE2MmY3MDgyNGEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.hQqyT3CE_T4uCnxZVYhzKnazMP-ZYI_fGyEaZX5A41A",
    },
    {
      name: "Demon Slayer",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgubfto-f30221e4-49d1-4de3-be46-e6f6adb365f2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1YmZ0by1mMzAyMjFlNC00OWQxLTRkZTMtYmU0Ni1lNmY2YWRiMzY1ZjIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.e9YbHSyt2fiK8pDByMUCb6kMeq4MorpjjPnqiwW0Gs8",
    },
    {
      name: "Death Note",
      url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9ad61435-33de-410b-a782-bea083f07fa7/dgubft7-19e7ba38-b673-48da-9eeb-3ae38a85ebf1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzlhZDYxNDM1LTMzZGUtNDEwYi1hNzgyLWJlYTA4M2YwN2ZhN1wvZGd1YmZ0Ny0xOWU3YmEzOC1iNjczLTQ4ZGEtOWVlYi0zYWUzOGE4NWViZjEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JYF0XXIBHEbrMDQKqh4imNX2-2HLl2V3jXBW-tqgw-g",
    },
  ];

  return (
    <section className="relative flex items-center justify-center w-full min-h-screen overflow-auto hero-wrapper">
      {/* Background Images with Opacity Transition */}
      <div
        className="fixed inset-0 transition-opacity duration-150 ease-in-out"
        style={{
          backgroundImage: "url(/background_light.png)",
          backgroundSize: "cover",
          backgroundPosition: lightBgPosition,
          backgroundRepeat: "no-repeat",
          opacity: isDark ? 0 : 1,
          minHeight: "100vh",
          minWidth: "100vw",
          willChange: "opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
      <div
        className="fixed inset-0 transition-opacity duration-150 ease-in-out"
        style={{
          backgroundImage: "url(/background_dark.png)",
          backgroundSize: "cover",
          backgroundPosition: darkBgPosition,
          backgroundRepeat: "no-repeat",
          opacity: isDark ? 1 : 0,
          minHeight: "100vh",
          minWidth: "100vw",
          willChange: "opacity",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
              "--blue-300": "#93c5fd",
              "--blue-400": "#60a5fa",
              "--blue-500": "#3b82f6",
              "--indigo-300": "#a5b4fc",
              "--violet-200": "#ddd6fe",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          />
        </div>
      </div>

      {/* Avatar - Top Left Corner */}
      <div className="fixed top-0 left-0 z-30 p-2 sm:p-3 md:p-4">
        <Avatar
          frameSize="60px"
          avatarSize="40px"
          className="sm:scale-110 md:scale-125"
        />
      </div>

      {/* Theme Switch - Top Right Corner */}
      <div className="fixed top-0 right-0 z-30 p-4 sm:p-5 md:p-6">
        <ThemeSwitch />
      </div>

      {/* Main Container */}
      <div
        className="container relative z-10 w-full"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        {/* Navigation Header */}
        <nav>
          <ul className="links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog">Blog </a>
            </li>
            <li>
              <a href="/music">Music</a>
            </li>
            <li>
              <a href="/soon" className="soon">
                Mail
              </a>
            </li>
            <li>
              <a href="/soon" className="soon">
                Videos
              </a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>

        <main>
          <div className="row profile">
            {/* Left Column */}
            <div className="w-40 col left">
              <h1>Zengel</h1>
              <div className="general-about">
                <div className="profile-pic">
                  <img src="/myimg.jpeg" alt="profile picture" loading="lazy" />
                </div>
                <div className="details">
                  <p></p>
                  <p></p>
                  <p className="online">
                    <img
                      src="https://spacehey.com/img/green_person.svg"
                      alt=""
                      aria-hidden="true"
                    />{" "}
                    ONLINE!
                  </p>
                </div>
              </div>
              <div className="contact">
                <div className="heading">
                  <h4>You can find me here</h4>
                </div>
                <div className="inner">
                  <div className="f-row">
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="logos/facebook.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Facebook
                      </a>
                    </div>
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="/logos/tiktok.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Tiktok
                      </a>
                    </div>
                  </div>
                  <div className="f-row">
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="logos/instagram.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Instagram
                      </a>
                    </div>
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="logos/youtube.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Youtube
                      </a>
                    </div>
                  </div>
                  <div className="f-row">
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="logos/youtube.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Youtube
                      </a>
                    </div>
                    <div className="f-col">
                      <a href="#">
                        <img
                          src="logos/steam.png"
                          className="icon"
                          aria-hidden="true"
                          loading="lazy"
                          alt="icon"
                        />{" "}
                        Steam
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-section">
                <div className="heading">
                  <h4>Links</h4>
                </div>
                <div className="inner">
                  <table
                    className="details-table"
                    cellSpacing={3}
                    cellPadding={3}
                  >
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col right">
              <div className="blog-preview">
                <h4>
                  Zengel's Latest Blog Entries [<a href="#">View Blog</a>]
                </h4>
              </div>
              <div className="blurbs">
                <div className="heading">
                  <h4>Blurbs</h4>
                </div>
                <div className="inner">
                  <div className="section">
                    <h4>About me:</h4>
                    <p>
                      {/* Badges */}
                      {badgeFiles.map((badge, idx) => (
                        <img
                          key={idx}
                          src={`/badges/${badge}`}
                          alt={`badge ${idx + 1}`}
                          className="inline-block mb-1 mr-1"
                          style={{ maxHeight: "50px", maxWidth: "50px" }}
                          loading="lazy"
                        />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className="friends">
                <div className="heading">
                  <h4>My Homeboys</h4>
                  <a className="more" href="#">
                    [view all]
                  </a>
                </div>
                <div className="inner">
                  <p>
                    <b>
                      Zengel has <span className="count">0</span> friends.
                    </b>
                  </p>
                  <div className="friends-grid"></div>
                </div>
              </div>
              <div className="friends" id="comments">
                <div className="heading">
                  <h4>Comments</h4>
                </div>
                <div className="inner">
                  <p>
                    <b>
                      Displaying <span className="count">0</span> of{" "}
                      <span className="count">0</span> comments ({" "}
                      <a href="#">View all</a> | <a href="#">Add Comment</a> )
                    </b>
                  </p>
                  <table
                    className="comments-table"
                    cellSpacing={0}
                    cellPadding={3}
                  >
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
