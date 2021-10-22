import React from "react"
import { Route, Switch } from 'react-router-dom'
import Events from "./Events/Events"
import Event from "./Event/Event"
import Page from "./Tabs/page"

const App = () => 
{
  return (
    <Switch>
      {/* <Route exact path="/" component={Events}/> */}
      <Route exact path="/events/:slug" component={Event}/>
      <Route exact path="/home" component={Page}/>
    </Switch>
  )
}

export default App