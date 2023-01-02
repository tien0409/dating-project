import classNames from "classnames/bind";

import styles from "./SettingsView.module.scss";
import SettingFilters from "./SettingFilters";
import SettingAdvanceFilters from "./SettingAdvanceFilters";
import UserSettings from "./UserSettings";
import SettingNotifications from "./SettingNotifications";
import DeleteAccountModal from "./DeleteAccountModal";

const cln = classNames.bind(styles);

const SettingsView = () => {
  return (
    <div className={cln("custom__scroll", "custom__scroll--tiny", "wrapper")}>
      <UserSettings />

      <SettingFilters />

      <SettingAdvanceFilters />

      <SettingNotifications />

      <DeleteAccountModal />
    </div>
  );
};

export default SettingsView;
