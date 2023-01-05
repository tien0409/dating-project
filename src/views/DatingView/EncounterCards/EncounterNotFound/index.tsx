import classNames from "classnames/bind";
import { Button } from "antd";
import { useRouter } from "next/router";

import styles from "./EncounterNotFound.module.scss";
import { PAYMENTS_ROUTE } from "@/configs/routes";

const cln = classNames.bind(styles);

const EncounterNotFound = () => {
  const router = useRouter();

  return (
    <div className={cln("wrapper")}>
      <h3 className={cln("title")}>You’ve hit the end of the line — for today!</h3>
      <p className={cln("description")}>
        Want to see more amazing people? Upgrade to Bumble Boost, or wait until tomorrow for more
        potential connections
      </p>
      <Button type="primary" shape="round" size="large" onClick={() => router.push(PAYMENTS_ROUTE)}>
        Upgrade for more people
      </Button>
    </div>
  );
};

export default EncounterNotFound;
