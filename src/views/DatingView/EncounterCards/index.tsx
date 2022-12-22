import { memo } from "react";
import { Else, If, Then } from "react-if";
import classNames from "classnames/bind";

import styles from "./EncounterCards.module.scss";
import useEncounterCards from "./EncounterCardsHook";
import EncounterCardItem from "./EncounterCardItem";
import EncounterCardLoading from "./EncounterCardLoading";

const cln = classNames.bind(styles);

const EncounterCards = () => {
  const { userExplores, indexEncounter, isFetching, handleSkip } = useEncounterCards();

  return (
    <div className={cln("wrapper")}>
      <If condition={isFetching}>
        <Then>
          <EncounterCardLoading />
        </Then>

        <Else>
          {userExplores?.map((user, index) => (
            <EncounterCardItem
              key={user?.id}
              user={user}
              isFront={indexEncounter === index}
              onSkip={handleSkip}
            />
          ))}
        </Else>
      </If>
    </div>
  );
};

export default memo(EncounterCards);
