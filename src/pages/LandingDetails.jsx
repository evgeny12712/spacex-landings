import { Component } from 'react';
import { landingService } from '../services/landingService';

export class LandingDetails extends Component {
  state = {
    landing: null,
  };

  componentDidMount() {
    this.loadLanding();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadLanding();
    }
  }

  async loadLanding() {
    const landing = await landingService.getById(this.props.match.params.id);
    this.setState({ landing });
  }

  onGoBack = () => {
    this.props.history.push('/');
  };

  failures = () => {
    return this.state.landing.failures.length ? (
      this.state.landing.failures.map((failure) => {
        return (
          <div className="failures flex column auto-center" key={this.state.landing.id + Math.random()}>
            <h1 className="failures-title">Failures :</h1>
            <section className="failures-container flex column">
              <div>
                <span>Reason: </span>
                {failure.reason}
              </div>
              <div>
                <span>Time : </span>
                {failure.time}
              </div>
              {failure.altitude && (
                <div>
                  <span>Altitude: </span>
                  {failure.altitude}
                </div>
              )}
            </section>
          </div>
        );
      })
    ) : (
      <div></div>
    );
  };

  render() {
    const { landing } = this.state;
    console.log(landing, 'landing');
    if (!landing) return <div>Loading..</div>;
    return (
      <section className="landing-details flex column auto-center">
        <h1 className="details-title">{landing.name}</h1>
        <img src={landing.imgUrl} alt="landings" />
        <section className="details-info flex column auto-center">
          <div>{this.failures()}</div>
          <div className="wikipedit-page">
            <span>Wikipedia Page : </span>
            <a href={landing.wikiLink}>{landing.wikiLink}</a>
          </div>
        </section>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${landing.video}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <button onClick={this.onGoBack} className="details-back-btn">
          Back
        </button>
      </section>
    );
  }
}
