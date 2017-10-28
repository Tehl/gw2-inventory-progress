import { connect } from "react-redux";

import Options from "./Options";
import { setProgressType } from "../../actions/options";

const mapStateToProps = state => {
  return {
    progressType: state.options.progressType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onProgressTypeChanged: event => dispatch(setProgressType(event.target.value))
  };
};

const OptionsContainer = connect(mapStateToProps, mapDispatchToProps)(Options);

export default OptionsContainer;
