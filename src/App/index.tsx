import * as ReactDOMClient from "react-dom/client";
import Layout from "./Layout/Layout";

import "../System/Styles/styles.css";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(<Layout />);
