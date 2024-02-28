/* eslint-disable */
import './profile.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import {
  Avatar, Divider, Menu, Switch, Form, Input, Button, DatePicker, Select, InputNumber, Upload, message, Progress,
} from 'antd';
import {
  UserOutlined,
  KeyOutlined,
  CalendarOutlined,
  MailOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './index.scss'
import { current } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import ChangePasswordForm from './components/changePasswordForm';
import Translation from '../../services/multi-language'

const success = (msg) => {
  message.success(msg);
  message.success(msg);
};

const error = (msg) => {
  message.error(msg);
  message.error(msg);
};

function Profile() {
  const currentUser = useSelector((state) => state.auth.login.currentUser)
  // // console.log("current usserrrrrr ",currentUser)

  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  const dispatch = useDispatch()

  const [menuTab, setMenuTab] = useState('1')

  const [firstname, setFirstname] = useState(currentUser.firstName)
  const [lastname, setLastname] = useState(currentUser.lastName)
  const [grade, setGrade] = useState(currentUser.grade)
  const [gender, setGender] = useState(currentUser.gender)
  const [DOB, setDOB] = useState(currentUser.DOB)
  const [phone, setPhone] = useState(currentUser.phone)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

  const onCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value)
  }
  const onNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }
  const onNewPasswordConfirmChange = (e) => {
    setNewPasswordConfirm(e.target.value)
  }

  const handleSubmitChangePassword = async (values) => {
    const res = await userApi.changePassword({ oldPassword: currentPassword, newPassword })
    // // console.log("ressss",res)
    if (res.success) {
      success(t('profile.successMsgPassword'));
    } else {
      error(t('profile.errorMsg'));
    }
  }

  const handleSubmit2 = async (values) => {
    // console.log("edit user info khi submit: ", values)
    const _id = currentUser.id || currentUser._id
    const editedUserInfo = {
      _id, firstName: values?.firstname, lastName: values?.lastname, grade: values?.grade?.value, gender: values?.gender?.value, phone: values?.phone, DOB: values.DOB ? values.DOB.format() : values.DOB,
    }
    // // console.log("edit user info khi submit: ", editedUserInfo)
    await userApi.editUser(editedUserInfo, dispatch)
    // if(success)
    success(t('profile.successMsgInfo'));
  }
  const uploadProps = {
    action: `${process.env.REACT_APP_API_URL}/users/images/`,
    multiple: false,
    onStart(file) {
      // console.log('onStartttt', file, file.name);
    },
    onSuccess(res, file) {
      // console.log('onSuccesssss', res);
      userApi.refreshCurrentUser(dispatch)
    },
    onError(err) {
      // console.log('onErrorrrr', err);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);

      userApi.updateAvatar(action, formData, {
        withCredentials,
        // headers,
      }).then(({ data: response }) => {
        onSuccess(response, file);
      })
        .catch(onError);
    },
  };

  const onChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }
  const onChangeLastname = (e) => setLastname(e.target.value)
  const onChangeGrade = (e) => {
    setGrade(e.value)
  }
  const onChangeGender = (e) => {
    setGender(e.value)
  }
  const onChangeDOB = (date, dateString) => {
    setDOB(date.format())
  }

  const onChangePhone = (e) => setPhone(e.target.value)

  const renderChildren = () => {
    switch (menuTab) {
      case '1':
        return (
          <div className="tw-px-0 md:tw-px-5 xs:tw-px-1">
            <div className="tw-text-primary tw-ml-10 md:tw-my-10 md:tw-text-5xl xs:tw-text-2xl xs:tw-hidden sm:tw-text-2xl sm:tw-my-2">{t('profile.infoHeader')}</div>
            <Form
              name="normal_login"
              className="tw-w-full tw-px-0 xs:tw-py-[30px]"
              onFinish={handleSubmit2}
              layout="vertical"
              initialValues={{
                // lastname,
                // firstname,
                // grade,
                // gender,
                // DOB: DOB === undefined || !moment(DOB).isValid() ? '' : moment(DOB),
                // phone,
                lastname: currentUser.lastName,
                firstname: currentUser.firstName,
                grade: currentUser.grade,
                gender: currentUser.gender,
                DOB: currentUser.DOB === undefined || !moment(currentUser.DOB).isValid() ? '' : moment(currentUser.DOB),
                phone: currentUser.phone,
              }}
            >
              <div className=" tw-inline-grid md:tw-grid-cols-2 grid-cols-1 tw-gap-0 tw-w-full">
                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoLastname')}
                    name="lastname"
                    className="tw-text-primary tw-w-full"
                    rules={[
                      {
                        required: true,
                        pattern: /(.|\s)*\S(.|\s)*$/,
                        message: t('profile.blank'),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('profile.infoLastname')}
                      type="text"
                      className="tw-rounded-lg tw-bg-white"
                    // value={lastname}
                    // onChange={onChangeLastname}
                    />
                  </Form.Item>
                </div>
                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoFirstname')}
                    name="firstname"
                    className="tw-text-primary tw-w-full"
                    rules={[
                      {
                        required: true,
                        pattern: /(.|\s)*\S(.|\s)*$/,
                        message: t('profile.blank'),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('profile.infoFirstname')}
                      className="tw-rounded-lg tw-bg-white"
                    // value={firstname}
                    // onChange={onChangeFirstname}
                    />
                  </Form.Item>
                </div>
                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoGrade')}
                    name="grade"
                    className="tw-text-primary tw-w-full"
                  >
                    <Select
                      placeholder={t('profile.infoGrade')}
                      className="tw-w-full"
                      labelInValue
                    // onSelect={onChangeGrade}
                    >
                      <Option value="1">1</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                      <Option value="4">4</Option>
                      <Option value="5">5</Option>
                      <Option value="6">6</Option>
                      <Option value="7">7</Option>
                      <Option value="8">8</Option>
                      <Option value="9">9</Option>
                      <Option value="10">10</Option>
                      <Option value="11">11</Option>
                      <Option value="12">12</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoGender')}
                    name="gender"
                    className="tw-text-primary tw-w-full"
                  >
                    <Select
                      placeholder={t('profile.infoGender')}
                      className="tw-w-full"
                      labelInValue
                    // onSelect={onChangeGender}
                    >
                      <Option value="Male">{t('profile.male')}</Option>
                      <Option value="Female">{t('profile.female')}</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoDOB')}
                    name="DOB"
                    className="tw-text-primary tw-w-full"
                  >
                    <DatePicker
                      placeholder={t('profile.infoDOB')}
                      className="tw-rounded-lg tw-bg-white tw-w-full"
                      // onChange={onChangeDOB}
                      allowClear={false}
                    />
                  </Form.Item>
                </div>

                <div className="tw-flex tw-justify-center tw-w-full tw-px-10 xs:tw-px-2">
                  <Form.Item
                    label={t('profile.infoPhone')}
                    name="phone"
                    className="tw-text-primary tw-w-full"
                    rules={[
                      {
                        validator: (_, value) => {
                          const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                          if (value && value !== '') {
                            if (vnf_regex.test(value) == false) {
                              return Promise.reject(new Error(`${t('profile.phoneValidator')}`));
                            }
                          }
                          return Promise.resolve();
                        }
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('profile.infoPhone')}
                      className="tw-rounded-lg tw-bg-white tw-w-full"
                    // onChange={onChangePhone}
                    />
                  </Form.Item>
                </div>

              </div>
              <div className="tw-w-full tw-flex tw-items-center tw-justify-center xs:tw-my-5 sm:tw-my-5">
                <Button type="primary" htmlType="submit" className="tw-w-1/3 tw-px-10 hover:bg-blue tw-rounded-lg bg-primary tw-flex tw-justify-center">
                  {t('profile.update')}
                </Button>
              </div>
            </Form>

          </div>
        );
      case '2':
        return (
          <ChangePasswordForm
            email={currentUser.email}
            onNewPasswordConfirmChange={onNewPasswordConfirmChange}
            onNewPasswordChange={onNewPasswordChange}
            onCurrentPasswordChange={onCurrentPasswordChange}
            newPasswordConfirm={newPasswordConfirm}
            newPassword={newPassword}
            currentPassword={currentPassword}
            handleSubmitChangePassword={handleSubmitChangePassword}
          />
        )
      default:
        return null;
    }
  };

  function AvatarView({ filename }) {
    return (
      <div className="">
        <div className="tw-flex tw-justify-center" />
        <Avatar className="tw-border-8 tw-border-black-900" size={145} src={`${process.env.REACT_APP_API_URL}/users/images/${filename}`} />
        <div className="tw-flex tw-justify-center tw-mt-3 tw-mb-10 tw-w-full">
          <Upload
            name="avatar"
            showUploadList={false}
            accept="image/*"
            // {...uploadProps}
            onChange={() => { userApi.refreshCurrentUser(dispatch) }}
            action={`${process.env.REACT_APP_API_URL}/users/images/`}
            withCredentials
          >
            <div className="tw-w-full">
              <Button className="hover:tw-rounded-lg">
                <UploadOutlined />
                upload
              </Button>
            </div>
          </Upload>
        </div>

      </div>
    )
  }
  return (
    <div className="profile__custom box tw-mt-10">
      <div className="tw-flex">
        <div className="tw-bg-primary tw-h-[35rem] tw-w-[13rem] tw-justify-center tw-rounded-lg">
          <div className="tw-flex tw-justify-center tw-mt-5">
            <AvatarView filename={currentUser.avatar} />
          </div>
          <Menu
            className="tw-w-full tw-bg-opacity-0.1"
            style={{
              // width: 288,
              // background-opacity:0.5,
            }}
            defaultSelectedKeys={[`${menuTab}`]}
            items={[
              {
                icon: <UserOutlined />,
                label: t('profile.infoHeader'),
                key: '1',
              },
              {
                icon: <KeyOutlined />,
                label: t('profile.passwordHeader'),
                key: '2',
              },
            ]}
            onClick={(key) => {
              setMenuTab(key.key)
            }}
          />
        </div>
        <div className="tw-bg-gray-100 tw-h-[35rem] tw-w-full tw-rounded-lg ">
          {renderChildren()}
        </div>
      </div>
    </div>
  )
}
export default Profile;
