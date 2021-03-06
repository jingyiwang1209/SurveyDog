import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import SurveyList from "./SurveyList";
import SearchBar from "./SearchBar";

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchSurvey();
    }

    constructor(props) {
        super(props);
        this.state = { toggleDate: null, togglePopularity: null, term: "" };
        this.handleSortDate = this.handleSortDate.bind(this);
        this.handleSortPopularity = this.handleSortPopularity.bind(this);
    }

    handleSortDate() {
        this.setState(prevState => ({
            toggleDate: !prevState.toggleDate,
            togglePopularity: null
        }));
    }

    handleSortPopularity() {
        this.setState(prevState => ({
            togglePopularity: !prevState.togglePopularity,
            toggleDate: null
        }));
    }

    renderList() {
        if (this.state.toggleDate === true && this.state.togglePopularity === null) {
            return (
                <SurveyList
                    term={this.state.term}
                    by={["dateSent"]}
                    rule={["asc"]}
                />
            );
        }

        if (this.state.togglePopularity === true && this.state.toggleDate === null) {
            return (
                <SurveyList
                    term={this.state.term}
                    by={["yes", "no"]}
                    rule={["desc"]}
                />
            );
        }

        if (this.state.togglePopularity === false && this.state.toggleDate === null) {
            return (
                <SurveyList
                    term={this.state.term}
                    by={["yes", "no"]}
                    rule={["asc"]}
                />
            );
        }

        return (
            <SurveyList
                term={this.state.term}
                by={["dateSent"]}
                rule={["desc"]}
            />
        );
    }

    render() {
        return (
            <div>
                <div style={{ margin: "15px 0" }}>
                    <SearchBar
                        onTermChange={term => this.setState({ term: term })}
                    />
                    <button
                        className="chip"
                        onClick={this.handleSortDate}
                        style={{ marginRight: "10px" }}
                    >
                        Sort By Date{" "}
                        <i className="material-icons right">date_range</i>
                    </button>
                    <button
                        className="chip"
                        onClick={this.handleSortPopularity}
                    >
                        Sort By Response{" "}
                        <i className="material-icons right">reply</i>
                    </button>
                </div>
                {this.renderList()}
                <div className="fixed-action-btn">
                    <Link
                        to="/surveys/new"
                        className="btn-floating btn-large red"
                    >
                        <i className="material-icons deep-orange darken-3">add</i>
                    </Link>
                </div>
            </div>
        );
    }
}
export default connect(null, actions)(Dashboard);