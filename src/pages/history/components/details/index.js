import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Pagination } from "antd";
import { useSearchParams } from 'react-router-dom'
// eslint-disable-next-line import/no-named-as-default-member
import DetailRow from "./detailRow";
import TopPart from "../topPart";
import recordApi from "../../../../api/recordApi";
import "./details.scss"
import Translation from '../../../../services/multi-language';

function Details() {
  const { t } = Translation();

  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user._id || user.id;
  // console.log("user", userid);

  // hook for query string
  // Tung added searchParams and useEffect for searchParams
  const [searchParams, setSearchParams] = useSearchParams()
  const params = {}
  for (const [key, value] of searchParams.entries()) {
    params[key] = value
  }
  const [formData, setFormData] = React.useState({
    current: 1,
    pageSize: 12,
    ...params,
  })
  const [response, setResponse] = React.useState({ data: [], total: 0 })
  React.useEffect(() => {
    document.title = "eWorkbook - History Exercise - Details"
    setSearchParams(formData)
    const getAllMaterials = async () => {
      try {
        const myResponse = await recordApi.getRecordsPaging({
          ...formData,
          name: formData.name !== '' ? formData.name : undefined,
          userId: userid,
        })
        setResponse(myResponse)
      } catch (err) {
        // console.log(err)
      }
    }
    getAllMaterials()
  }, [formData])

  const onPaginationChange = (page, pageSize) => {
    setFormData((prev) => ({
      ...prev,
      current: page,
      pageSize,
    }))
  }
  const onNameSearchChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      current: 1,
      name: e.target.value,
    }))
  }

  return (
    <div className="history-container box tw-box tw-text-center">
      <TopPart current="Detail" onNameSearchChange={onNameSearchChange} />
      <div className="filler tw-h-8" />

      <div className="header-row-container tw-mb-2">
        <Row className="header-row md:tw-text-lg tw-text-sm tw-font-semibold tw-text-black">
          <Col className="tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100" span={7}>{t('history.book')}</Col>
          <Col className="tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100" span={5}>{t('history.name')}</Col>
          <Col className="tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100" span={4}>{t('history.time')}</Col>
          <Col className="tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100" span={2}>{t('history.score')}</Col>
          <Col className="tw-m-0 tw-m-[0.4%] tw-rounded-md tw-bg-gray-100" span={5}>{t('history.action')}</Col>
        </Row>
      </div>
      <div className="details-history">
        {response.data.map((record) => (
          <DetailRow key={record._id} record={record} />
        ))}
      </div>
      <Pagination
        className="tw-col-span-full tw-mt-8"
        current={formData.current}
        pageSize={formData.pageSize}
        total={response.total}
        onChange={onPaginationChange}
        showQuickJumper
      />
    </div>
  );
}
export default Details;
