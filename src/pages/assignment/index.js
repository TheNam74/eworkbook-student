import React from "react";
import { useSelector } from "react-redux";
import {
  Row, Col, Pagination,
} from "antd";
import { useSearchParams } from 'react-router-dom'
import recordApi from "../../api/recordApi";
import TopPart from "../history/components/topPart";
import AssignmentRow from "./assignmentRow";
import Translation from '../../services/multi-language';

function Assignments() {
  const { t } = Translation();

  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user?._id || user?.id;
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
    pageSize: 6,
    ...params,
  })
  const [response, setResponse] = React.useState({ data: [], total: 0 })
  React.useEffect(() => {
    setSearchParams(formData)
    const getAllAssignments = async () => {
      const myResponse = await recordApi.getAssignmentsPaging({
        ...formData,
        name: formData.name !== '' ? formData.name : undefined,
        student: userid,
      })
      setResponse(myResponse)
    }
    getAllAssignments()
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
      <TopPart current="Assignment" onNameSearchChange={onNameSearchChange} />
      <div className="tw-hidden md:tw-block header-row-container tw-mb-2">
        <Row className="header-row md:tw-text-lg tw-text-sm tw-font-semibold tw-text-black">
          <Col span={2} />
          <Col span={15} className="tw-text-left">{t('history.information')}</Col>
          <Col span={4} className="tw-pl-1 tw-text-left">{t('history.deadline')}</Col>
          <Col span={3} className="tw-pl-1 tw-text-left">{t('history.action')}</Col>
        </Row>
      </div>
      <div className="filler tw-h-1" />
      <div className="books-history">
        {response.data.map((book) => (
          book?.material && <AssignmentRow key={book._id} {...book} />
        ))}
      </div>
      <Pagination
        className="tw-col-span-full tw-mt-8"
        current={formData.current}
        pageSize={formData.pageSize}
        total={response.total}
        onChange={onPaginationChange}
      />
    </div>
  );
}

export default Assignments;
