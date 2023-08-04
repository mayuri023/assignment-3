import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CourseList from "./CourseList";
import EnquiryForm from "./EnquiryForm";
import EnquiryList from "./EnquiryList";

function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={CourseList} />
      <Route path="/enquire/:courseId" component={EnquiryForm} />
      <Route path="/enquiries" component={EnquiryList} />
    </Switch>
  </Router>
  );
}

export default App;
