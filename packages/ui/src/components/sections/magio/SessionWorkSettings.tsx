import React from 'react';
import { SettingsCheckboxRow, SettingsInset, SettingsSection } from '@/components/sections/shared/SettingsSection';
import { JevAccessNote } from '@/components/sections/classification/JevAccessNote';
import { useI18n } from '@/lib/i18n';
import { isVSCodeRuntime } from '@/lib/desktop';
import { useUIStore } from '@/stores/useUIStore';
import { selectSafetyNetAvailable, useRoutingStore } from '@/stores/useRoutingStore';

/**
 * "In work": the sidebar block and the Track / Done actions, and whether Jev
 * moves sessions in on its own. Jev runs on the Magio server, so VS Code
 * offers only the manual part.
 */
export const SessionWorkSettings: React.FC = () => {
  const { t } = useI18n();
  const isVSCode = React.useMemo(() => isVSCodeRuntime(), []);
  const enabled = useUIStore((state) => state.sessionWorkEnabled);
  const autoOpen = useUIStore((state) => state.sessionWorkAutoOpen);
  const keepInGroup = useUIStore((state) => state.sessionWorkKeepInGroup);
  const setEnabled = useUIStore((state) => state.setSessionWorkEnabled);
  const setAutoOpen = useUIStore((state) => state.setSessionWorkAutoOpen);
  const setKeepInGroup = useUIStore((state) => state.setSessionWorkKeepInGroup);
  const jevAvailable = useRoutingStore(selectSafetyNetAvailable);

  return (
    <SettingsSection
      title={t('settings.magio.sessionWork.title')}
      info={t('settings.magio.sessionWork.info')}
      settingsItem="sessions.work"
    >
      <SettingsCheckboxRow
        settingsItem="sessions.work-enabled"
        checked={enabled}
        onChange={setEnabled}
        label={t('settings.magio.sessionWork.field.enabled')}
        ariaLabel={t('settings.magio.sessionWork.field.enabled')}
      />
      <SettingsCheckboxRow
        settingsItem="sessions.work-keep-in-group"
        checked={enabled && keepInGroup}
        onChange={setKeepInGroup}
        disabled={!enabled}
        label={t('settings.magio.sessionWork.field.keepInGroup')}
        ariaLabel={t('settings.magio.sessionWork.field.keepInGroup')}
        info={t('settings.magio.sessionWork.field.keepInGroupInfo')}
      />
      {!isVSCode ? (
        <SettingsInset className="space-y-0">
          <SettingsCheckboxRow
            settingsItem="sessions.work-auto-open"
            checked={enabled && jevAvailable && autoOpen}
            onChange={setAutoOpen}
            disabled={!enabled || !jevAvailable}
            label={t('settings.magio.sessionWork.field.autoOpen')}
            ariaLabel={t('settings.magio.sessionWork.field.autoOpen')}
            info={t('settings.magio.sessionWork.field.autoOpenInfo')}
          />
          <JevAccessNote />
        </SettingsInset>
      ) : null}
    </SettingsSection>
  );
};
