import {
  Button, Form, Rate, Input,
} from "antd";
import { useSelector } from 'react-redux'
import React, { useEffect } from "react";
import Translation from '../../../../../services/multi-language';

const { TextArea } = Input;
function Editor({
  onTextChange, onRatingChange, onSubmit, submitting, value, ratingStar, action,
}) {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])
  return (
    <>
      <Form.Item>
        <Rate onChange={onRatingChange} value={ratingStar} />
      </Form.Item>
      <Form.Item>
        <TextArea rows={3} onChange={onTextChange} value={value} placeholder="leave comment..." />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          {action === "Edit" ? <p>{t('rating.confirmChange')}</p> : <p>{t('rating.addRating')}</p> }
        </Button>
      </Form.Item>
    </>
  );
}

export default Editor;
