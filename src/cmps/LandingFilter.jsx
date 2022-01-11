import { Component } from 'react';

export class LandingFilter extends Component {
  state = {
    isSucceed: null,
  };

  handleChange = ({ target }) => {
    let value = target.value;
    switch (value) {
      case 'success':
        value = true;
        break;
      case 'fail':
        value = false;
        break;
      default:
        value = null;
    }
    this.setState({ isSucceed: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    return (
      <section className="landing-filter flex auto-center">
        <label htmlFor="isSucceed">
          Search only :
          <select name="is-succed" id="is-succed" onChange={this.handleChange} className="select-filter">
            <option value="all"></option>
            <option value="success">Succeed</option>
            <option value="fail">Not succeed</option>
          </select>
          landings
        </label>
      </section>
    );
  }
}
