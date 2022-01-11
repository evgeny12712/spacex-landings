import { Component } from 'react';
import { LandingFilter } from '../cmps/LandingFilter';
import { LandingList } from '../cmps/LandingList';
import { landingService } from '../services/landingService';
export class LandingApp extends Component {
  state = {
    landings: null,
    filterBy: null,
    pagination: { pageIdx: 1, landingsPerPage: 20 },
  };

  async componentDidMount() {
    this.loadLandings();
  }

  async loadLandings() {
    const { filterBy, pagination } = this.state;
    const landings = await landingService.query(filterBy, pagination);
    this.setState({ landings });
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadLandings);
  };

  setPageIdx = (pageIdx) => {
    this.setState(
      (prevState) => ({ pagination: { ...prevState.pagination, pageIdx } }),
      () => {
        this.loadLandings();
        window.scrollTo(0, 0);
      }
    );
  };

  render() {
    const { landings, pagination } = this.state;
    let numOfLandings = landingService.getNumOfItems();
    let pagesList = [];
    if (landings) {
      let numOfPages = Math.ceil(numOfLandings / pagination.landingsPerPage);
      for (let i = 1; i < numOfPages; i++) {
        pagesList.push(
          <li key={`${numOfPages * Math.random()}`}>
            <button className={i === pagination.pageIdx ? 'active' : 'page-btn'} onClick={() => this.setPageIdx(i)}>
              {i}
            </button>
          </li>
        );
      }
    }

    // if (!landings) return <div>Loading...</div>;
    return (
      <section className="landing-app">
        <LandingFilter onChangeFilter={this.onChangeFilter} />
        {landings ? <LandingList landings={landings} /> : <div>No landings to show...</div>}
        <ul className="pages-list flex auto-center wrap">{landings && pagesList}</ul>
      </section>
    );
  }
}
