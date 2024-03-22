import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { BrowserRouter } from "react-router-dom"
import { Layout } from "./components/Layout/Layout"
import { Provider } from "react-redux"
import { store } from "./store/store"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
