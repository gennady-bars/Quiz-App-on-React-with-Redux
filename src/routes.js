import { Route, Switch, Redirect } from "react-router-dom";

import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Logout from "./components/Logout/Logout";
import CustomQuizList from "./containers/QuizList/CustomQuizList";
import CustomQuizCreator from "./containers/QuizCreator/CustomQuizCreator";
import CustomQuiz from "./containers/Quiz/CustomQuiz";

const createRoutes = (isAuthenticated, isAdmin) => {
  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizList} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/customQuiz/:id" component={CustomQuiz} />
        <Route path="/custom-quiz-creator" component={CustomQuizCreator} />
        <Route path="/custom-quizes" component={CustomQuizList} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  if (isAdmin) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return routes;
};

export default createRoutes;
