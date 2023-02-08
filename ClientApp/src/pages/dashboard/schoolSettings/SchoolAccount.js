import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import shareFill from '@iconify/icons-eva/share-fill';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

// material
import { Container, Tab, Box, Tabs, Stack } from '@material-ui/core';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import {
  AccountGeneral,
  AccountLocation,
  AccountSocialLinks,
  AccountChangePassword
} from '../../../components/_dashboard/schoolSettings/school/account';

// ----------------------------------------------------------------------

export default function SchoolAccount() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('general');
  const [schoolData, setSchoolData] = useState({ Id: 10 });

  const ACCOUNT_TABS = [
    {
      value: 'general',
      title: 'عام',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral schoolData={schoolData} setSchoolData={setSchoolData} />
    },
    {
      value: 'location',
      title: 'العنوان',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountLocation />
    },
    {
      value: 'social_links',
      title: 'روابط اجتماعية',
      icon: <Icon icon={shareFill} width={20} height={20} />,
      component: <AccountSocialLinks />
    },
    {
      value: 'change_password',
      title: 'كلمة المرور',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="المدارس: إدارة الملف التعريفي للمدرسة | طريقي">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="حساب التعريفي للمدرسة"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'إدارة المدارس', href: PATH_DASHBOARD.schoolSetting },
            { name: 'حساب التعريفي للمدرسة' }
          ]}
        />

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {schoolData?.Id == null ? (
              <Tab
                disableRipple
                key={ACCOUNT_TABS[0].value}
                label={`${ACCOUNT_TABS[0].title}`}
                icon={ACCOUNT_TABS[0].icon}
                value={ACCOUNT_TABS[0].value}
              />
            ) : (
              ACCOUNT_TABS.map((tab, index) => (
                <Tab disableRipple key={tab.value} label={`${tab.title}`} icon={tab.icon} value={tab.value} />
              ))
            )}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
