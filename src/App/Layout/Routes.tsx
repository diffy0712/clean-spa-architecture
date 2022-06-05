import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import Home from "../Pages/Home/Home";
import Counter from "../Pages/Counter/Counter";
import Contact from "../Pages/Contact/Contact";
import ContactVM from "../Pages/ContactVm/ContactVM";

const Routes = () => {
  const location = useLocation();
  const modules: [string, ReactElement][] = [
    /**["/notes", <NotesModule /> ]*/
  ];

  // With the location.pathname defined as key, when navigating between
  // sub routes, the change will rerender (reroute) the whole tree.
  // By narrowing the location key, to be only the modules, main route
  // the navigation between sub routes of the same group, will only rerender (reroute)
  // inside the sub route branch.
  //
  // Using animations this problem is visible. Just return the location.pathname as key :)
  const getLocationKey = () => {
    // TODO: ezt befejezni
    return location.pathname.indexOf("notes") > 0
      ? "/notes"
      : location.pathname;
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <RouterRoutes location={location} key={getLocationKey()}>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact-vm" element={<ContactVM />} />
        {modules.map((module) => (
          <Route path={`${module[0]}/*`} element={module[1]} key={module[0]} />
        ))}
      </RouterRoutes>
    </AnimatePresence>
  );
};
export default Routes;
