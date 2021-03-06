import React, { Component } from "react";
import PatientDataService from "../services/patient.service";

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.getPatient = this.getPatient.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.deletePatient = this.deletePatient.bind(this);

    this.state = {
      currentPatient: {
        id: null,
        name: "",
        age: "",
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPatient(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPatient: {
          ...prevState.currentPatient,
          name: name
        }
      };
    });
  }

  onChangeAge(e) {
    const age = e.target.value;

    this.setState(prevState => ({
      currentPatient: {
        ...prevState.currentPatient,
        age: age
      }
    }));
  }

  getPatient(id) {
    PatientDataService.get(id)
      .then(response => {
        this.setState({
          currentPatient: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePatient() {
    PatientDataService.update(
      this.state.currentPatient.id,
      this.state.currentPatient
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The patient was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePatient() {
    PatientDataService.delete(this.state.currentPatient.id)
      .then(response => {
        this.props.history.push('/doctors/' + this.state.currentPatient.doctor.id + '/patients')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPatient } = this.state;

    return (
      <div>
        {currentPatient ? (
          <div className="edit-form">
            <h4>Patient</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentPatient.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentPatient.age}
                  onChange={this.onChangeAge}
                />
              </div>

              <div className="form-group">
                <label htmlFor="totalMoneySpent">Total Money Spent</label>
                <input
                    disabled
                    type="text"
                    className="form-control"
                    id="totalMoneySpent"
                    value={currentPatient.totalMoneySpent}
                />
              </div>

              <div className="form-group">
                <label htmlFor="registeredDate">Registration Date</label>
                <input
                    disabled
                    type="text"
                    className="form-control"
                    id="registrationDate"
                    value={currentPatient.registrationDate}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePatient}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePatient}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Patient...</p>
          </div>
        )}
      </div>
    );
  }
}
