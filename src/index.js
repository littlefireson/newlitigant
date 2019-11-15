import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { HashRouter as Router} from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import App from './containers'
import store from './store'
const rootElement = document.getElementById('app');
const hotRender =  (Component) => {
    render(
    <AppContainer>
        <Provider store={store}>
            <Router>
                <Component/>
            </Router>
        </Provider>
    </AppContainer>,
    rootElement
)
}
hotRender(App);
if(module.hot) {
    module.hot.accept('./containers', () => {
        const NewApp = require("./containers").default;
        hotRender(NewApp)
    })
}