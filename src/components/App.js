import React from "react";
import WishlistProgress from "./WishlistProgress/Container";
import Options from "./Options/Container";

const App = () =>
  <div>
    <div className="row">
      <div className="col col-6 push-center">
        <Options />
      </div>
    </div>
    <div className="row">
      <div className="col col-6 push-center">
        <WishlistProgress />
      </div>
    </div>
  </div>;

export default App;
