import tasks from "./data/tasks.json";
import Quiz from "./components/Quiz/Quiz";

export function App() {
  return <Quiz tasks={tasks} />;
}
