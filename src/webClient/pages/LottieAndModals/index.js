import React from "react";
import { Link } from "react-router-dom";
import { Flex, TopPage } from "../../components";
import ANIMATIONS from "../../app/animations";

const Gallery = ({ match }) => (
  <Flex column align="center" justify="center" py={3}>
    <TopPage title="ModalUrls and Lottie" color="lavender" />
    <h1>Modal Links</h1>
    {ANIMATIONS.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/anim/${i.id}`,
          state: { modal: true }
        }}
      >
        <p>{i.title}</p>
      </Link>
    ))}
    <h1>Full Links</h1>
    {ANIMATIONS.map(i => (
      <Link key={i.id} to={`/anim/${i.id}`}>
        <p>{i.title}</p>
      </Link>
    ))}
  </Flex>
);

export default Gallery;
