import React, {Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Header from './Header';
import Landing from './Landing'
import { connect } from 'react-redux';
import * as actions from '../actions';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component{
    constructor(){
        super()
    }

    componentDidMount(){
        this.props.fetchUser();
        // componentdidmount is preferred over componentwillmount for making initial ajax requests
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header></Header>
                        <Route exact path="/" component={Landing}></Route>
                        <Route exact path ="/surveys" component={Dashboard}></Route>
                        <Route path ="/surveys/new" component={SurveyNew}></Route>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);