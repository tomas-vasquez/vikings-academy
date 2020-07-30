import { createStore, combineReducers, applyMiddleware } from 'redux';

// import noticationsReducer from 'store/notifications_store/reducer';
import userDataReducer from 'store/userData_store/reducer';
import parentDataReducer from 'store/parentData_store/reducer';
import appReducer from 'store/app_store/reducer';
import prospectsReducer from "store/prospects_store/reducer";
import usersReducer from "store/users_store/reducer";
import payReportsReducer from "store/pay_reports_store/reducer";
import academyReducer from "store/academy_store/reducer";
import commentsReducer from "store/comments_store/reducer";
import platformReducer from "store/platform_store/reducer";
import editorReducer from "store/editor_store/reducer"
//import payMethodsReducer from "store/pay_methods/reducer";

import thunk from 'redux-thunk';
import {reducer as notificationsReducer} from 'reapop';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const store = createStore(
  combineReducers({

    editor: editorReducer,
    app: appReducer,
    platform: platformReducer,
    userData: userDataReducer,
    parentData: parentDataReducer,
    users: usersReducer,
    prospects: prospectsReducer,
    // notification: noticationsReducer,
    payReports: payReportsReducer,
    academy: academyReducer,
    comments: commentsReducer,
    //payMethods: payMethodsReducer,

    notifications: notificationsReducer(),
    router: connectRouter(history),

  }), applyMiddleware(thunk, routerMiddleware(history))
);

store.log = () => {
  console.log('  %c Store > %c estado:%c', 'background:green; color:white', 'background:#b6ffa7', '', store.getState());
};

export { history };

export default store;