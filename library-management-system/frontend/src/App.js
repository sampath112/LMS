import React, { Suspense } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { Container } from "@mui/material"
import { NotificationContainer } from "react-notifications"
import { AppLayout } from "./components/layout/app-layout"
import { UserProvider } from "./context/user-context"
import { Register } from "./components/Register"


export const App = () => (
  <UserProvider>
    <Suspense fallback={null}>
      <Container className="page-container">
        <Router>
          <AppLayout>
            <Register />
          </AppLayout>
          <NotificationContainer />
        </Router>
      </Container>
    </Suspense>
  </UserProvider>
)

