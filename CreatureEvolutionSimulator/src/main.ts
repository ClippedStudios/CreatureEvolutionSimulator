import { Application } from "./app/Application";
import "./style.css";

const appRoot = document.getElementById("app");

if (!appRoot) {
  throw new Error("Unable to find #app container in document.");
}

const application = new Application(appRoot);
void application.initialize();
