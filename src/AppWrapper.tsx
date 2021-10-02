import React from "react"

import ErrorBoundary from "./ErrorBoundary"
import {TodoProvider} from "./contexts/TodoProvider"
import App from "./App"

const AppWrapper = () => {
  return (
    <ErrorBoundary>
      <TodoProvider>
        <App />
      </TodoProvider>
    </ErrorBoundary>
  )
}

export default AppWrapper
