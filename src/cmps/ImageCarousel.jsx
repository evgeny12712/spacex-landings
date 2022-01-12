import { Component } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
export class ImageCarousel extends Component {
  state = {
    current: 0,
  };

  prevImg = () => {
    if (this.state.current !== 0) {
      this.setState((prevState) => ({ current: prevState.current - 1 }));
    } else this.setState({ current: this.props.images.length - 1 });
  };

  nextImg = () => {
    if (this.state.current !== this.props.images.length - 1) {
      this.setState((prevState) => ({ current: prevState.current + 1 }));
    } else this.setState({ current: 0 });
  };

  render() {
    const { current } = this.state;
    const { images } = this.props;
    return (
      <section className="image-carousel flex auto-center">
        <FaArrowAltCircleLeft className="arrow-left" onClick={this.prevImg} />
        <FaArrowAltCircleRight className="arrow-right" onClick={this.nextImg} />
        {images &&
          images.map((image, idx) => {
            return (
              <div className={idx === current ? 'slider active' : 'slider'} key={idx + Math.random()}>
                {idx === current && <img className="image" src={image} alt="slide" key={image} />}
              </div>
            );
          })}
      </section>
    );
  }
}
