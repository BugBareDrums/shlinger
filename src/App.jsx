import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { AccusationPage } from "./pages/Accusation";
import { Accuse } from "./pages/Accuse";
import { Connect } from "./pages/Connect";
import { LeaderboardPage } from "./pages/Leaderboard";
import { Name } from "./pages/Name";
import { Root } from "./pages/Root";
import { Welcome } from "./pages/Welcome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/accuse",
        element: <Accuse />
      },
      {
        path: "/accusation/:uid",
        element: <AccusationPage/>
      },
      {
        path: "/naughty-list",
        element: <LeaderboardPage />
      }
    ]
  },
  {
    path: "/connect",
    element: <Connect />
  },
  {
    path: "/name",
    element: <Name />
  }
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
