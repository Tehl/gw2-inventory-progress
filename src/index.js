import Gw2Api from "./services/Gw2Api";
import initialize from "./logic/initialize";
import apiKey from "./apiKey";

let api = new Gw2Api(apiKey);

initialize(api).then(res => {
  console.log(res.inventory);
});
