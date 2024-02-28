/* eslint-disable */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  useParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Modal, List, Typography, Divider, Row, Col, Spin, Button } from 'antd'
import moment from 'moment'
import DragAndDrop from './exerciseList/dragAndDrop'
import TopBanner from './components/topBanner'
import ExerciseSelector from './components/exerciseSelector'
import ExerciseList from './exerciseList'
import HandleExercise from './exerciseList/handleExersice'
import Match from './exerciseList/match'
import MultiChoice from './exerciseList/multichoice'
import FillBlank from './exerciseList/fillBlank'
import Wordsearch from './exerciseList/wordsearch'
import Unscramble from './exerciseList/unscramble'
import Sort from './exerciseList/sort'
import Listening from './exerciseList/listening'
import exerciseApi from '../../api/exerciseApi'
import materialApi from '../../api/materialApi'
import Translation from '../../services/multi-language'
import PicDragAndDrop from './exerciseList/picDragAndDrop'
import './ExercisePage.scss'
import recordApi from "../../api/recordApi";
import MakeSentence from "./exerciseList/makeSentence";
import useWindowSize from "./hooks/useWindowSize";
import CrosswordPuzzle from "./exerciseList/crossword";
import { MobileBreakPoint, ModelZIndex } from "../../constant";
import LineWordSearch from "./exerciseList/lineWordSearch";
import PleaseLoginModal from './components/pleaseLoginModal'
import { switchLangActions } from '../../store/slice/switchLangSlice'
import replaceAllInserter from 'string.prototype.replaceall'

replaceAllInserter.shim();

function ExercisePage() {
  const windowSize = useWindowSize()
  const [mode, setMode] = useState(true)
  const [exercise, setExercise] = useState([])
  const Assignment = useRef([])
  const book = useRef()
  const materialAssignment = useRef() //Phu dont know how to use assignment above so i create this shit
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const [signalToSubmit, setSignalToSubmit] = useState(false)
  const [isResultModalVisible, setIsResultModalVisible] = useState(false)
  const [isConfirmSubmitVisible, setIsConfirmSubmitVisible] = useState(false)
  let { materialid } = useParams()
  const navigate = useNavigate()
  const lang = useSelector(state => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  const [loading, setLoading] = useState(false)
  const record = useRef({})
  const [examNotifyModalVisible, setExamNotifyModalVisible] = useState(
    book.current?.isLimitTime
  )
  const user = useSelector(state => state.auth.login.currentUser)
  const userid = user?._id || user?.id
  const dispatch = useDispatch()
  // const time = '00:00:100'
  const [timeLeft, setTimeLeft] = useState() // = moment.duration(time).asSeconds()
  useEffect(() => {
    if (searchParams.get('isMobile')) {
      ChangeLanguage('en')
    }
    else
      ChangeLanguage(lang)
  }, [lang])
  useEffect(() => {
    // console.log('searchParams >>>>>>', searchParams)
    if (searchParams.get('isMobile')) {
      ChangeLanguage('en')
      dispatch(switchLangActions.toEnglish())
      // console.log('searchParams >>>>>>', searchParams)
    }
  }, [])
  // set sticky sidebar
  const [positionFixed, setPositionFixed] = useState(true)
  useEffect(() => {
    setPositionFixed(true)
  }, [])

  const [isPleaseLoginModalVisible, setIsPleaseLoginModalVisible] =
    useState(false)

  useEffect(() => {
    if (!searchParams.get('recordId')) {
      const getAllExercises = async () => {
        try {
          // // console.log("matid =", materialid);
          setLoading(true)
          // if user go to exercise page for demo
          if (location.pathname.includes('/demo')) {
            materialid = await materialApi.getDemoMaterialId()
          }
          const materialData = await materialApi.getParentMaterial(materialid)
          const response = await exerciseApi.getExercisesOfMaterial(materialid)
          // const mat = await materialApi.getMaterial(materialid);
          const assignment = await recordApi.getOneAssignment({
            material: materialid,
            student: userid,
          })
          materialAssignment.current = assignment?.data
          if (materialAssignment.current?.isLimitTime)
            setTimeLeft(
              moment.duration(materialAssignment.current.limitTime).asSeconds()
            )
          // // console.log("Fetch exercises successfully: ", response);
          setLoading(false)
          setExercise(response)
          // console.log('response', response)
          Assignment.current = response
          book.current = materialData
          setExamNotifyModalVisible(materialAssignment.current?.isLimitTime)
          // // console.log("mat", mat);
        } catch (error) {
          // console.log('Failed to fetch exercise list: ', error)
        }
      }
      getAllExercises()
    } else {
      const getRecordById = async () => {
        try {
          setLoading(true)
          const response = await recordApi.getRecordById(
            searchParams.get('recordId')
          )
          // // console.log("Fetch record successfully: ", response);
          setLoading(false)
          record.current = response
          setExercise(response?.children[0]?.userAnswer)
          setMode(false)
        } catch (error) {
          // // console.log("Failed to fetch exercise list: ", error);
        }
      }
      getRecordById()
    }
  }, [materialid])
  // Put all exercises which user did into correct array
  const handleGetAssignment = (data, id, type) => {
    Assignment.current = Assignment.current?.map(item => {
      const { _id, exerciseType } = item
      if (_id === id && type === exerciseType) {
        return { ...item, content: { _id: item.content._id, detail: data } }
      }
      return item
    })
  }

  // Call API to get result
  const handleCheck = async () => {
    try {
      setLoading(true)
      const response = await exerciseApi.receiveStatus({
        data: Assignment.current,
        materialId: materialid,
      })
      navigate(`/checkpoint/${response.recordId}?${searchParams.get('isMobile') ? 'isMobile=true' : ''}`)
    } catch (error) {
      // console.log('Failed to receive status: ', error)
    }
  }

  // Emit signal to get all data prepare to submit
  const handleSubmit = async () => {
    if (!signalToSubmit) {
      setMode(false)
      setIsConfirmSubmitVisible(false)
      setSignalToSubmit(() => true)
    }
  }

  // After get all data, call API to submit and get result
  useEffect(() => {
    document.title = 'eWorkbook - Exercise'
    const submitAPI = async () => {
      if (signalToSubmit) {
        handleCheck()
        // navigate(`/history/details/currentuser?current=1&pageSize=12`)
        // setIsResultModalVisible(true);
      }
    }
    submitAPI()
  }, [signalToSubmit])

  const getResultList = useCallback(() => {
    const lessonHasKey = [...exercise]
    return lessonHasKey?.map(item => {
      const { _id, exerciseType, content, title } = item
      const { status } = content
      const total = status?.length
      const corrects = status?.filter(({ correct }) => correct)?.length
      return {
        _id,
        exerciseType,
        corrects,
        total,
        title,
      }
    })
  }, [mode, exercise])
  // Result popup
  const handleOk = () => {
    setIsResultModalVisible(false)
    setMode(() => false)
  }
  const handleCancel = () => {
    if (book.current?._id) {
      navigate(`/root-detail/${book.current?._id}`)
    } else {
      navigate(`/library`)
    }
  }

  // Confirm submit popup
  const handleConfirmSubmitOk = async () => {
    setIsConfirmSubmitVisible(false)
    await handleSubmit()
  }
  const handleConfirmSubmitCancel = () => {
    setIsConfirmSubmitVisible(false)
  }
  const ConfirmModel = useCallback(
    () => (
      <Modal
        title={t('exercise.confirm')}
        visible={isConfirmSubmitVisible}
        okText={t('exercise.confirm')}
        cancelText={t('exercise.continue')}
        onOk={handleConfirmSubmitOk}
        onCancel={handleConfirmSubmitCancel}
        zIndex={ModelZIndex}
      >
        <p>{t('exercise.confirmMessage')}</p>
      </Modal>
    ),
    [isConfirmSubmitVisible]
  )

  const handleExamNotifyOk = () => {
    setExamNotifyModalVisible(false)
  }
  const handleExamNotifyCancel = () => {
    navigate(-1)
  }
  const ExamNotifyModal = useCallback(
    () => (
      <Modal
        title={t('exercise.examNotifyTitle')}
        visible={examNotifyModalVisible}
        onOk={handleExamNotifyOk}
        onCancel={handleExamNotifyCancel}
        okText={t('exercise.examNotifyButton')}
        cancelText={t('exercise.examNotifyCancel')}
      >
        <p>{t('exercise.examNotifyContent')}</p>
        <p>
          {t('exercise.examNotifyTime')}
          {timeLeft ? moment.utc(timeLeft * 1000).format('HH:mm:ss') : ''}
        </p>
      </Modal>
    ),
    [examNotifyModalVisible]
  )
  const ResultModel = useCallback(
    () => (
      <Modal
        title={t('exercise.result')}
        style={{ witdh: '500px' }}
        visible={isResultModalVisible}
        okText={t('exercise.review')}
        onOk={handleOk}
        cancelText={t('exercise.back')}
        onCancel={handleCancel}
        closable={false}
        zIndex={ModelZIndex}
      >
        <List
          bordered
          dataSource={getResultList()}
          renderItem={(item, index) => (
            <List.Item className="tw-flex tw-justify-between">
              <Typography.Text mark>
                {`${index + 1}. ${item.title} `}
              </Typography.Text>
              {'                  '}
              {item.corrects}/{item.total}
            </List.Item>
          )}
        />
      </Modal>
    ),
    [isResultModalVisible]
  )

  const handleConfirm = () => {
    if (!userid) {
      setIsPleaseLoginModalVisible(true)
    } else {
      setIsConfirmSubmitVisible(true)
    }
  }
  const handleTimeOut = async () => {
    handleSubmit()
  }
  const handleNextLesson = async () => {
    const navigateWithQuery = (path) =>
      navigate(`${path}?${searchParams.get('isMobile') ? 'isMobile=true' : ''}`, { replace: true });
    const currentRecord = record.current;
    try {
      const nextLesson = await materialApi.getNextMaterial({
        root: currentRecord?.root,
        parent: currentRecord?.parent,
        current: currentRecord?.children[0].exerciseId,
      })
      navigateWithQuery(`/exercise/${nextLesson?._id}`)
      // navigate(0)
    } catch (error) {
      if (currentRecord?.root === currentRecord?.children[0].exerciseId) {
        navigateWithQuery(`/library`)
      } else navigateWithQuery(`/root-detail/${currentRecord?.root}`)
      // console.log("Failed to fetch checkpoint list: ", error);
    }
  }
  const Exercise = useCallback(
    () => (
      <div className="exercise-page box">
        <Divider
          orientation="left"
          style={{ color: '#2c4073', fontWeight: '500', fontSize: '20px' }}
        >
          Do Exercise
        </Divider>
        <Row gutter={[20, 60]} className="tw-pb-20">
          <Col lg={4} md={24} sm={24}>
            <div
              className={
                positionFixed
                  ? 'tw-sticky lg:tw-top-20 lg:tw-right lg:tw-right-[5%] sm:tw-top-10 sm:tw-right'
                  : ''
              }
            >
              <ExerciseSelector
                exerciseItems={exercise}
                handleConfirm={mode ? handleConfirm : null}
                timeControl={
                  materialAssignment.current?.isLimitTime && mode
                    ? {
                      time: timeLeft,
                      onTimeOut: () => handleTimeOut(),
                    }
                    : null
                }
              />
            </div>
          </Col>
          <Col
            lg={20}
            sm={24}
            md={24}
            className="tw-flex tw-flex-col tw-items-center"
          >
            <ExerciseList
              source={exercise}
              getAssignment={handleGetAssignment}
              isDoingMode={mode}
              signalToSubmit={signalToSubmit}
            >
              {/* EDIT FOR NEW TOE */}
              <HandleExercise type="MultipleChoice" element={<MultiChoice />} />
              <HandleExercise type="Match" element={<Match />} />
              <HandleExercise type="FillBlank" element={<FillBlank />} />
              <HandleExercise type="Wordsearch" element={<Wordsearch />} />
              <HandleExercise type="Unscramble" element={<Unscramble />} />
              <HandleExercise type="DragAndDrop" element={<DragAndDrop />} />
              <HandleExercise type="Sort" element={<Sort />} />
              <HandleExercise
                type="PicDragAndDrop"
                element={<PicDragAndDrop />}
              />
              <HandleExercise type="MakeSentence" element={<MakeSentence />} />
              <HandleExercise type="Crossword" element={<CrosswordPuzzle />} />
              <HandleExercise type="Unscramble" element={<Unscramble />} />
              <HandleExercise
                type="LineWordSearch"
                element={<LineWordSearch />}
              />
              <HandleExercise type="Listening" element={<Listening />} />
            </ExerciseList>
            {(exercise.length > 0) && (searchParams.get('recordId') ?
              <div className="submit-button tw-w-1/5">
                <Button onClick={() => handleNextLesson()} className="tw-bg-primary tw-text-white tw-text-bold tw-py-2 tw-text-center tw-px-4 tw-rounded-md tw-w-full tw-align-middle">
                  {t('exercise.next')}
                </Button>
              </div>
              : <div className="submit-button tw-w-1/5">
                <Button onClick={handleConfirm} className="tw-bg-primary tw-text-white tw-text-bold tw-py-2 tw-text-center tw-px-4 tw-rounded-md tw-w-full tw-align-middle">
                  {t('exercise.submit')}
                </Button>
              </div>)}

          </Col>
        </Row>
      </div>
    ),
    [exercise, mode, signalToSubmit],
  );
  if (windowSize.width < MobileBreakPoint) {
    return (
      <div className="tw-flex tw-flex-col tw-items-center tw-mt-20">
        <div className="tw-flex tw-justify-center ">
          <img
            className="tw-w-1/2"
            src="../assets/images/rotate-phone.jpg"
            alt="rotate phone"
          />
        </div>
        <p className="tw-text-lg tw-text-primary tw-text-center">
          Rotate your phone or change to a bigger screen to do exercises
        </p>
      </div>
    )
  }
  const canStartRender = !examNotifyModalVisible
  return (
    <>
      {materialAssignment.current?.isLimitTime && <ExamNotifyModal />}
      {canStartRender && (
        <Spin spinning={loading}>
          <ResultModel />
          <ConfirmModel />
          <div className="box">
            {book && userid && <TopBanner book={book} userId={userid} />}
          </div>
          <Exercise windowSize={windowSize.width}/>
          <PleaseLoginModal
            visible={isPleaseLoginModalVisible}
            setVisible={setIsPleaseLoginModalVisible}
          />
        </Spin>
      )}
    </>
  )
}
export default ExercisePage
