/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useDragLayer } from "react-dnd";
import { isMobile } from "react-device-detect";
import { MobileBreakPoint, PCBreakPoint } from "../../../../constant";
import useWindowSize from "../../hooks/useWindowSize";

const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  border: "1px dashed red",
};

function getItemStyles(initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

function CustomDragLayer({ component }) {
  const windowSize = useWindowSize()
  const {
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }
  let previewItem = <div>hihi</div>

  switch (component) {
    case "dnd":
      previewItem = (
        <div className="clip-long-text tw-px-4 tw-py-1 tw-m-2 tw-text-primary tw-border-2 tw-border-black tw-rounded-md tw-cursor-pointer tw-text-center tw-align-middle tw-text-sm !tw-min-w-[37px] !tw-max-w-[150px] !tw-min-h-[35px]">
          {item.word}
        </div>
      )
      break;
    case "sort":
      previewItem = (
        <div className="tw-w-[170px] tw-select-none tw-cursor-pointer tw-mr-2 md:tw-mr-5 tw-opacity-30">
          {
            item.elementImg && (
            <img
              className="tw-max-w-full tw-rounded-md tw-drop-shadow-md"
              src={`${process.env.REACT_APP_API_URL}/exercises/images/${item.elementImg}`}
              alt="element"
            />
            )
          }
        </div>
      )
      break;
  }
  if (!isMobile) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {
          previewItem
        }
      </div>
    </div>
  );
}

export default CustomDragLayer;
