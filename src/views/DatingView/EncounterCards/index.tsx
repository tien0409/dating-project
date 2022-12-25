import { memo } from "react";
import { Else, If, Then } from "react-if";
import classNames from "classnames/bind";

import styles from "./EncounterCards.module.scss";
import useEncounterCards from "./EncounterCardsHook";
import EncounterCardItem from "./EncounterCardItem";
import EncounterCardLoading from "./EncounterCardLoading";
import EncounterNotFound from "./EncounterNotFound";

const cln = classNames.bind(styles);

const EncounterCards = () => {
  const { userExplores, indexEncounter, isFetching, handleNext } = useEncounterCards();

  return (
    <div className={cln("wrapper")}>
      <If condition={isFetching}>
        <Then>
          <EncounterCardLoading />
        </Then>

        <Else>
          <If condition={userExplores.length}>
            <Then>
              {userExplores?.map((user, index) => (
                <EncounterCardItem
                  key={user?.id}
                  user={user}
                  isFront={indexEncounter === index}
                  handleNext={handleNext}
                />
              ))}
            </Then>

            <Else>
              <EncounterNotFound />
            </Else>
          </If>
        </Else>
      </If>
    </div>
  );
};

export default memo(EncounterCards);
