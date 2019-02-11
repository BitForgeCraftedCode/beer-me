import React from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

import { setDrunkLevel } from '../redux/actions';

class DrunkennessLevel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drunkLevel: '--Please choose an option--'
		};
	}
	notify = () => {
		toast.warn('Please select your drunkenness level', {
			position: toast.POSITION.TOP_CENTER
		});
	};
	taunt = () => {
		toast.error('Come on baby my grandma can drink more than you!!', {
			position: toast.POSITION.TOP_CENTER
		});
	};
	encourage = () => {
		toast.success(`That's more like it! Drink up!`, {
			position: toast.POSITION.TOP_CENTER
		});
	};

	handleDrunkChange(e) {
		this.setState({ drunkLevel: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.state.drunkLevel === '--Please choose an option--') {
			this.notify();
			return;
		}
		if (this.state.drunkLevel <= 7) {
			this.taunt();
		}
		if (this.state.drunkLevel > 7) {
			this.encourage();
		}
		this.props.setDrunkLevel(this.state.drunkLevel);
		this.resetForm();
	}

	resetForm() {
		this.setState({
			drunkLevel: '--Please choose an option--'
		});
	}

	render() {
		return (
			<form className="DrunkSettings" onSubmit={e => this.handleSubmit(e)}>
				<fieldset className="DrunkSettings__fieldset">
					<legend className="DrunkSettings__legend">Choose Drunkenness Level:</legend>
					<label className="DrunkSettings__label" htmlFor="drunk-select">
						ABV Level:
					</label>
					<div className="DrunkSettings__select-div">
						<select
							className="DrunkSettings__select"
							id="drunk-select"
							value={this.state.drunkLevel}
							onChange={e => this.handleDrunkChange(e)}
						>
							<option value="--Please choose an option--" disabled>
								--Please choose an option--
							</option>
							<option value="5">5</option>
							<option value="5.5">5.5</option>
							<option value="6">6</option>
							<option value="6.5">6.5</option>
							<option value="7">7</option>
							<option value="7.5">7.5</option>
							<option value="8">8</option>
							<option value="8.5">8.5</option>
							<option value="9">9</option>
							<option value="9.5">9.5</option>
							<option value="10">10</option>
							<option value="10.5">10.5</option>
							<option value="11">11</option>
							<option value="11.5">11.5</option>
							<option value="12">12</option>
							<option value="12.5">12.5</option>
						</select>
					</div>
				</fieldset>

				<div className="appBtnContainer">
					<button className="appBtn" type="submit" value="Submit">
						Change Drunk Level
					</button>
				</div>
				<div className="appBtnContainer">
					<button className="appBtn" type="button" value="Reset" onClick={() => this.resetForm()}>
						Cancel
					</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = {
	setDrunkLevel: setDrunkLevel
};

export default connect(
	null,
	mapDispatchToProps
)(DrunkennessLevel);
