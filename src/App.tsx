import Home from './pages/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MembersPage from './pages/MembersPage';
import NotFound from './pages/NotFound';
import ApplyPage from './pages/ApplyPage';
import MemberDetails from './pages/MemberDetails';
import Navbar from './components/Navbar';
import AlumniPage from './pages/AlumniPage';
import Footer from './components/Footer';
import React from 'react';
import { action, observable } from 'mobx';
import { MMData } from './models/MMData';
import { DataUtils } from './utilities/DataUtils';
import { observer } from 'mobx-react';


function App(): JSX.Element {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Content />
        <Footer />
      </div>
    </Router>
  );
}

export interface PageProps {
  mmData?: MMData;
}

@observer
class Content extends React.Component {

  @observable mmData?: MMData;

  constructor(props: any) {
    super(props);
    DataUtils.getData().then(action((mmData: MMData) => this.mmData = mmData));
  }
  render() {
    return <div className="content">
      <Switch>
        <Route exact path="/">
          <Home mmData={this.mmData} />
        </Route>
        <Route exact path="/members">
          <MembersPage mmData={this.mmData} />
        </Route>
        <Route exact path="/alumni">
          <AlumniPage mmData={this.mmData} />
        </Route>
        <Route exact path="/alumni/:id">
          <MemberDetails mmData={this.mmData} />
        </Route>
        <Route exact path="/members/:id">
          <MemberDetails mmData={this.mmData} />
        </Route>
        <Route exact path="/apply">
          <ApplyPage mmData={this.mmData} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  }
}

export default App;
