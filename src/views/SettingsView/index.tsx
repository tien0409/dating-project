import classNames from "classnames/bind";

import styles from "./SettingsView.module.scss";
import { DefaultLayout } from "@/layouts";
import SettingFilters from "./SettingFilters";
import SettingAdvanceFilters from "./SettingAdvanceFilters";
import UserSettings from "./UserSettings";
import SettingNotifications from "./SettingNotifications";
import DeleteAccountModal from "./DeleteAccountModal";

const cln = classNames.bind(styles);

const SettingsView = () => {
  return (
    <DefaultLayout>
      <div className={cln("custom__scroll", "custom__scroll--tiny", "wrapper")}>
        <UserSettings />

        <SettingFilters />

        <SettingAdvanceFilters />

        <SettingNotifications />

        <DeleteAccountModal />
      </div>
    </DefaultLayout>
  );
};

export default SettingsView;
