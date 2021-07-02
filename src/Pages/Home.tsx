import { useState, useEffect } from "react";
import Canvas from "../components/Canvas";
import "../css/styles.css";
export default function Home() {
  const testImages: string[] = [
    "https://picsum.photos/1920/1080/?image=967",
    "https://picsum.photos/1920/1080/?image=569",
    "https://picsum.photos/1920/1080/?image=119",
    "https://picsum.photos/1920/1080/?image=507",
  ];
  const subtitleArray: string[] = [
    "a Software Engineer",
    "an Artist",
    "a Developer",
    "a Designer",
    "a Programmer",
    "a Mechanical Keyboard Enthusiast",
  ];
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => {
        if (prev >= subtitleArray.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [subtitleArray.length]);
  return (
    <div>
      <Canvas width={1000} height={300} />;
      <div className='home-intro-container'>
        <h1 className='intro-title'>I am Ziyang Li</h1>
        <p className='intro-subtitle'>I am {subtitleArray[subtitleIndex]}</p>
      </div>
      <div id='content-block'>
        <div className='content-push'>
          <div className='parallax-slide'>
            <div className='parallax-clip'>
              <div
                className='fixed-parallax'
                style={{
                  backgroundImage: `url(${testImages[0]})`,
                }}
              ></div>
            </div>
          </div>
          <div className='parallax-slide'>
            <div className='parallax-clip'>
              <div
                className='fixed-parallax'
                style={{
                  backgroundImage: `url(${testImages[2]})`,
                }}
              ></div>
            </div>
          </div>

          <div className='parallax-slide'>
            <div className='parallax-clip'>
              <div
                className='fixed-parallax'
                style={{
                  backgroundImage: `url(${testImages[1]})`,
                }}
              ></div>
            </div>
          </div>

          <div className='parallax-slide'>
            <div className='parallax-clip'>
              <div
                className='fixed-parallax'
                style={{
                  backgroundImage: `url(${testImages[3]})`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
