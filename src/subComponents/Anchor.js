import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Anchor, Link } from "../components/AllSvgs";

const Container = styled.div`
  @media only screen and (max-width: 640px) {
    display: none;
  }
  position: relative;
`;
const Slider = styled.div`
  position: fixed;
  top: 0;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(-100%);
  .chain {
    transform: rotate(135deg);
  }
`;

const PreDisplay = styled.div`
  position: absolute;
  top: 0;
  right: 2rem;
`;

const AnchorComponent = (props) => {
  const ref = useRef(null);
  const hiddenRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      let scrollPosition = window.pageYOffset;
      let windowSize = window.innerHeight;
      let bodyHeight = document.body.offsetHeight;

      let diff = Math.max(bodyHeight - (scrollPosition + windowSize));
      //diff*100/scrollposition
      let diffP = (diff * 100) / (bodyHeight - windowSize);

      ref.current.style.transform = `translateY(${-diffP}%)`;

      if (window.pageYOffset > 5) {
        hiddenRef.current.style.display = "none";
      } else {
        hiddenRef.current.style.display = "block";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container>
      <PreDisplay ref={hiddenRef} className="hidden">
        <Anchor width={70} height={70} fill="black" />
      </PreDisplay>
      <Slider ref={ref}>
        {[...Array(props.number)].map((x, id) => {
          return (
            <Link
              key={id}
              width={25}
              height={25}
              fill="black"
              className="chain"
            />
          );
        })}
        <Anchor width={70} height={70} fill="black" />
      </Slider>
    </Container>
  );
};

export default AnchorComponent;
