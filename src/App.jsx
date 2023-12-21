import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import { AccusationPage } from "./pages/Accusation";
import { Accuse } from "./pages/Accuse";
import { LeaderboardPage } from "./pages/Leaderboard";
import { Root } from "./pages/Root";
import { Welcome } from "./pages/Welcome";
import { Connect } from "./pages/Connect";
import {Name} from "./pages/Name";

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
        path: "/leaderboard",
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
