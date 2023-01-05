import classNames from "classnames/bind";

import styles from "./LoadingScreen.module.scss";

const cln = classNames.bind(styles);

const LoadingScreen = () => {
  return (
    <div className={cln("wrapper")}>
      <div className={cln("lds-heart")}>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
