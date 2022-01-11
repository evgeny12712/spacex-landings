import { Component } from 'react';
import { landingService } from '../services/landingService';
import { LandingFailures } from '../cmps/LandingFailures';
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

  render() {
    const { landing } = this.state;
    if (!landing) return <div>Loading..</div>;
    return (
      <section className="landing-details flex column auto-center">
        <h1 className="details-title">{landing.name}</h1>
        <img src={landing.imgUrl} alt="landings" />
        <section className="details-info flex column auto-center">
          <div className="date-row">
            <span>Date : </span> {new Date(landing.date).toLocaleString()}
          </div>
          <LandingFailures failures={landing.failures} />
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
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button onClick={this.onGoBack} className="details-back-btn">
          Back
        </button>
      </section>
    );
  }
}
