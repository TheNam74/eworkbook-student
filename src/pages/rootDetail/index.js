import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spin, Tree } from 'antd';
import { useSelector } from "react-redux";
import './root.scss'
import './rootDetail.scss'
import classNames from 'classnames'
import { DownCircleOutlined, RightCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import RootBanner from './components/rootBanner'
import materialApi from '../../api/materialApi';
import Translation from '../../services/multi-language';
import Rating from './components/rating';

function mytitleRender2(props, t) {
  const linkToMaterial = `/exercise/${props._id}`;
  const rightAbsoluteClassName = `right-absolute right-absolute${props.depthLevel}`;

  // assign class for score display
  const percent = props.myrecord?.numberCorrect !== undefined
    && props.myrecord?.totalQuestion !== undefined
    ? props.myrecord.numberCorrect / props.myrecord.totalQuestion : 0
  // const scoreClass = percent <= 0.5 ? 'tw-text-[#b50000]' : (percent <= 0.8 ? 'tw-text-[#ffa54e]' : 'tw-text-[#008000]');
  // const scoreClassBg = percent <= 0.5 ? 'tw-bg-[#b50000]' : (percent <= 0.8 ? 'tw-bg-[#ffa54e]' : 'tw-bg-[#008000]');
  // const scoreClassBorder = percent <= 0.5 ? 'tw-border-[#b50000]' : (percent <= 0.8 ? 'tw-border-[#ffa54e]' : 'tw-border-[#008000]');
  const scoreClassBorder = percent <= 0.5 ? 'low' : (percent <= 0.8 ? 'medium' : 'high');
  return (
    <span
      className={classNames("title-node", {
        "my-leaf-node": props.children.length === 0 || props.depthLevel !== 1,
      })}
    >
      <span
        className={classNames("white-span-father", {
          "my-leaf-node": props.children.length === 0 || props.depthLevel !== 1,
        })}
      >
        <span
          className={classNames("white-span", {
            "my-leaf-node":
              props.children.length === 0 || props.depthLevel !== 1,
          })}
          style={{ left: `${-27 + props.depthLevel * 10}px` }}
        />
      </span>
      <span
        className="left-vertical-line"

      />
      <span
        className="node-name-container"
        style={{
          marginLeft: `${-5 + props.depthLevel * (window.innerWidth > 768 ? 15 : 10)}px`,
        }}
      >
        {props.type}
      </span>
      <span className="filler" />
      <span
        className="vertical-line"
        style={{
          left: `${(window.innerWidth > 768 ? 55 : 25) + props.depthLevel * (window.innerWidth > 768 ? 15 : 10)}px`,
        }}
      />
      <span
        className="title-text"
        style={{
          left: `${(window.innerWidth > 768 ? 60 : 30) + props.depthLevel * (window.innerWidth > 768 ? 15 : 10)}px`,
        }}
      >
        {props.title}
      </span>
      <span className={rightAbsoluteClassName}>
        <span className={`score tw-text-primary tw-right-28 tw-relative tw-z-10 `}>
          <p className={`${scoreClassBorder} ${classNames({ 'tw-hidden': !props.myrecord })} `}>
            <span>{props.myrecord?.numberCorrect}</span>
            /
            {props.myrecord?.totalQuestion}
            {' '}
          </p>
        </span>
        <Link to={linkToMaterial}>
          <button type="submit" className={classNames('my-button-child', { 'hide-if-not-leaf': props.children.length !== 0 })}>
            <span>{t('rootDetail.learn')}</span>
          </button>
        </Link>
        <span
          className={classNames("right-absolute", "fake-switch", {
            hidden: props.depthLevel === 1 || props.children.length === 0,
          })}
        >
          <RightCircleOutlined />
        </span>
      </span>
    </span>
  );
}

function hasClass(element, className) {
  return ` ${element.className} `.indexOf(` ${className} `) > -1;
}

function onSwitchClick(event) {
  const clickedItem = event.target;
  const switchContainer = clickedItem.parentNode.parentNode.parentNode;
  const open = hasClass(switchContainer, "ant-tree-switcher_open");
  const parentItem = clickedItem.parentNode.parentNode.parentNode.parentNode;
  const fakeSwitch = parentItem?.querySelector(".fake-switch");
  const svg = fakeSwitch?.querySelector("svg");
  if (open && svg) {
    // console.log("open", svg);
    svg.style.transform = "rotate(0deg)";
  } else if (svg) {
    // console.log("close");
    svg.style.transform = "rotate(90deg)";
  }
}

function mySwitchIcon(props) {
  return (
    <span
      className={classNames(
        "switch-icon",
        { hidden: props.isLeaf },
        { "primary-color": props.depthLevel === 2 },
      )}
    >
      <DownCircleOutlined
        className="white-color"
        onClick={onSwitchClick}
        style={{ pointerEvents: "all" }}
      />
    </span>
  );
}

function saveExpandKeys(thisExpandedKeys, materialId) {
  const lsExpandedKeys = JSON.parse(localStorage.getItem("materialExpandedKeys"));
  const newLsExpandedKeys = lsExpandedKeys || [];
  const index = newLsExpandedKeys.findIndex((item) => item.materialId === materialId);
  if (index === -1) {
    newLsExpandedKeys.push({ materialId, expandedKeys: thisExpandedKeys });
  } else {
    newLsExpandedKeys[index].expandedKeys = thisExpandedKeys;
  }
  localStorage.setItem("materialExpandedKeys", JSON.stringify(newLsExpandedKeys));
}

function RootDetail() {
  const [DataisLoaded, setDataisLoaded] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [rootDetail, setRootDetail] = useState([]);
  const [userData, setUserData] = useState({});
  const [privateRoot, setPrivateRoot] = useState(false);
  const { id: bookid } = useParams();
  const navigate = useNavigate()

  const { t } = Translation();

  const user = useSelector((state) => state.auth.login.currentUser);
  const userid = user._id || user.id;
  function getTreeDataFromJson(json, myCustomeDepthLevel, allRecords) {
    const mytreeData = [];
    for (let i = 0; i < json.children.length; i += 1) {
      const node = json.children[i];

      let record = null;
      if (allRecords) {
        for (let k = allRecords.length - 1; k >= 0; k -= 1) {
          if (allRecords[k].parent === node._id) {
            if (record) {
              if (allRecords[k].numberCorrect > record.numberCorrect) {
                record = allRecords[k];
              }
            } else {
              record = allRecords[k];
            }
          }
        }
      }
      const nodeData = {
        title: node.name,
        key: node._id,
        type: node.type,
        nodename: node.name,
        children: getTreeDataFromJson(node, myCustomeDepthLevel + 1, allRecords),
        depthLevel: myCustomeDepthLevel,
        _id: node._id,
        myrecord: record,
      };
      mytreeData.push(nodeData);
    }
    return mytreeData;
  }
  function sumScoreOfAllLeaf(mytreeData) {
    let sum = 0;
    for (let i = 0; i < mytreeData.length; i += 1) {
      if (mytreeData[i].children.length === 0) {
        if (mytreeData[i].myrecord) {
          sum += mytreeData[i].myrecord.numberCorrect;
        }
      } else {
        sum += sumScoreOfAllLeaf(mytreeData[i].children);
      }
    }
    return sum;
  }
  useEffect(() => {
    document.title = "eWorkbook - Materials Detail"
    const getmyRootDetail = async () => {
      try {
        Promise.all([
          materialApi.getAllRecordOfThisRoot(bookid, userid),
          materialApi.getRootMaterial(bookid),
          materialApi.getBookRecord(userid, bookid)])
          .then((values) => {
            const myAllRecords = values[0];
            const response = values[1];
            const bookRecord = values[2];
            // console.log("responese", response);
            if (response.status === "private") {
              // console.log("this is private")
              navigate('/404');
            }
            // console.log("Fetch root detail successfully: ", response);
            const json = response;
            const mytreeData = getTreeDataFromJson(json, 1, myAllRecords);
            setTreeData(mytreeData);
            setRootDetail(json);
            setPrivateRoot(response.status === "private");

            let averageScore = sumScoreOfAllLeaf(mytreeData);
            averageScore /= bookRecord.LeafDone.length;
            averageScore = Math.round(averageScore);
            const donePercent = Math.round((bookRecord.LeafDone.length * 100)
              / bookRecord.numberOfLeafTotal)

            const myUserData = {
              averageScore,
              donePercent,
            }
            setUserData(myUserData);
            setDataisLoaded(true);
          })
      } catch (error) {
        // console.log("Failed to fetch root detail: ", error);
      }
    };

    getmyRootDetail();
  }, []);

  if (!DataisLoaded || privateRoot) {
    return (
      <div>
        <h1>
          {" "}
          <LoadingOutlined />
          {' '}
          ....
          {" "}
        </h1>
      </div>
    );
  }
  if (rootDetail.status !== "private" && privateRoot === false) {
    // console.log(JSON.parse(localStorage.getItem("materialExpandedKeys"))?.find((item) => item.materialId === bookid)?.expandedKeys);
    return (
      rootDetail.status !== "private" && treeData.length > 0 ? (
        <>
          <RootBanner rootDetail={rootDetail} userData={userData} userId={userid} />
          <div className="root-detail box" id="tree-data-section">
            <Tree
              treeData={treeData}
              onExpand={(expandedKeys) => saveExpandKeys(expandedKeys, bookid)}
              defaultExpandedKeys={JSON.parse(localStorage.getItem("materialExpandedKeys"))?.find((item) => item.materialId === bookid)?.expandedKeys}
              titleRender={(props) => mytitleRender2(props, t)}
              switcherIcon={mySwitchIcon}
            />
          </div>
          <section id="ratingSection">
            <Rating rootDetail={rootDetail} />
          </section>
          <script src="./simple.js" />
        </>
      ) : <div className="tw-mx-auto tw-mt-10 tw-w-fit"><Spin size="large" /></div>);
  }
  return (
    <div>
      <h1>
        private
      </h1>
    </div>
  );
}

export default RootDetail
