import { CheckOutlined } from '@ant-design/icons';
import { List } from 'antd';
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react';
import Translation from '../../../../../services/multi-language';

function RatingStarFilterList({ starFilter }) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  const locale = {
    emptyText: (
      <span>
        <p className="tw-text-black tw-text-base">
          {t('rating.noFilterChecked')}
        </p>
      </span>
    ),
  };
  return (
    <List
      dataSource={starFilter}
      grid={{
        gutter: 4,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      locale={locale}
      renderItem={(item) => (
        <List.Item>
          <span className="tw-inline-block tw-bg-third tw-bg-opacity-60 tw-rounded-full">
            <CheckOutlined color="tw-secondary" className="tw-pl-1" />
            <span className="tw-ml-1">{item}</span>
            <span role="img" aria-label="star" className="anticon anticon-star tw-ml-1 tw-pr-1">
              <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" className="tw-fill-secondary" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z" /></svg>
            </span>
          </span>
        </List.Item>
      )}
    />
  )
}

export default RatingStarFilterList;
