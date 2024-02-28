import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import { DebounceInput } from 'react-debounce-input'
import classNames from 'classnames';
import UnderlineAnchor from '../../../profile/components/anchorSection/component/underlineAnchor';
import Translation from '../../../../services/multi-language';

function TopPart({ current, onNameSearchChange }) {
  const { t } = Translation();
  return (
    <div className="history-header">
      <div className="tw-w-100 tw-text-center tw-pt-20">
        <h1 className="tw-text-3xl">{t('history.yourlearninghistory')}</h1>
        <div className="filler tw-h-6" />
        <h2 className="tw-text-xl tw-px-[20%] tw-text-gray-600">{t('history.descriptionToppart')}</h2>
        <div className="filler tw-h-10" />
        {' '}
        <DebounceInput
          debounceTimeout={500}
          onChange={onNameSearchChange}
          placeholder={t('history.searchByName')}
          element={Input}
          className="tw-w-2/3 tw-justify-self-stretch tw-rounded-sm tw-h-12 tw-px-5 tw-mb-7"
          suffix={
            <SearchOutlined className="tw-cursor-pointer tw-text-2xl tw-leading-none" />
          }
          allowClear
        />
        <div className="filler tw-h-10" />
        <div className="anchor">
          <Row justify="center" className="anchor_color px-30">
            <Col span={7} />
            <Col span={2}>
              {/* <a href="/history/currentuser" className={classNames('anchor_a_style', { 'primary-color': (current === 'Books') })}>{t('history.books')}</a> */}
              <Link to="/history/currentuser" className={classNames('anchor_a_style', { 'primary-color': (current === 'Books') })}>{t('history.books')}</Link>
            </Col>
            <Col span={2} />
            <Col span={2}>
              {/* <a href="/history/details/currentuser" className={classNames('anchor_a_style', { 'primary-color': (current === 'Detail') })}>{t('history.details')}</a> */}
              <Link to="/history/details/currentuser" className={classNames('anchor_a_style', { 'primary-color': (current === 'Detail') })}>{t('history.details')}</Link>
            </Col>
            <Col span={2} />
            <Col span={2}>
              <Link to="/assignments/currentuser?current=1&pageSize=12" className={classNames('anchor_a_style', { 'primary-color': (current === 'Assignment') })}>{t('history.assignment')}</Link>
            </Col>
            <Col span={7} />
          </Row>
          <Row className="anchor_color">
            <Col span={7}>
              {' '}
              <UnderlineAnchor underlineID="filler" />
              {' '}
            </Col>
            <Col span={2}>
              <UnderlineAnchor underlineID="Books" current={current} />
            </Col>
            <Col span={2}>
              {' '}
              <UnderlineAnchor underlineID="filler" />
              {' '}
            </Col>
            <Col span={2}>
              <UnderlineAnchor underlineID="Detail" current={current} />
            </Col>
            <Col span={2}>
              {' '}
              <UnderlineAnchor underlineID="filler" />
              {' '}
            </Col>
            <Col span={2}>
              <UnderlineAnchor underlineID="Assignment" current={current} />
            </Col>
            <Col span={7}>
              {' '}
              <UnderlineAnchor underlineID="filler" />
              {' '}
            </Col>
          </Row>
        </div>
        <div className="filler tw-h-10" />
      </div>
    </div>
  )
}

export default TopPart
