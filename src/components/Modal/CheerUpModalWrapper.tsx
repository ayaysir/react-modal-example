import { Product } from 'components/CheerUpProductItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '.';

type Props = {
  currentItem: Product;
  resetSelectedItem: () => void;
};

export const CheerUpModalWrapper = ({ currentItem, resetSelectedItem }: Props) => {
  const [isModalDisplay, setModalDisplay] = useState(false);
  const [isModalFadeOut, setModalFadeOut] = useState(false);

  /**
   * == 모달 닫기 기능 ==
   * modalFadeOut을 먼저 전달해 200ms 동안 페이드아웃 애니메이션을 진행하도록 하고
   * 201ms가 되었을 시 컴포넌트를 display="none" 처리.
   */
  const onClose = () => {
    setModalFadeOut(true);
    setTimeout(() => {
      setModalDisplay(false);
      resetSelectedItem(); // 같은 아이템에 대한 모달을 껐다 켤 때 새로고침 안되는 현상을 방지하기 위함
    }, 201);
  };

  const sendCheer = () => {
    // eslint-disable-next-line no-alert
    alert(`[${currentItem.title}] 수강신청 완료`);
    onClose();
  };

  useEffect(() => {
    if (currentItem) {
      setModalDisplay(true);
      setModalFadeOut(false);
    }
  }, [currentItem]);

  return (
    <>
      {isModalDisplay && (
        <Modal
          isDisplay={isModalDisplay}
          isModalFadeOut={isModalFadeOut}
          onClose={onClose}
          title="수강할 수업 를 확인해 주세요"
        >
          <ChildContent>
            <img src={currentItem.photoUrl} alt={currentItem?.title} />
            <div className="detail">{currentItem.title}</div>
          </ChildContent>
          <ChildButtonArea>
            <StyledButton type="button" className="cancel" onClick={onClose}>
              취소하기
            </StyledButton>
            <StyledButton type="button" onClick={sendCheer}>
              수강하기
            </StyledButton>
          </ChildButtonArea>
        </Modal>
      )}
    </>
  );
};

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ChildContent = styled(StyledFlexDiv)`
  justify-content: flex-start;
  align-items: flex-start;

  & img {
    margin-left: 24px;
    width: 212px;
    border-radius: 3px;
  }

  & .detail {
    margin-left: 16px;
    margin-right: 32px;

    font-family: iOS Display Figma;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;

    letter-spacing: -0.01em;
    font-feature-settings: 'case' on, 'ss02' on;

    color: #1a1a1a;
  }

  /* 모바일 바텀싯*/
  @media (max-width: 450px) {
    & img {
      width: 45%;
    }
  }
`;

const ChildButtonArea = styled(StyledFlexDiv)`
  padding: 16px 24px;
  @media (max-width: 1023px) {
    padding-bottom: 28px;
  }
`;

const StyledButton = styled.button`
  width: 50%;
  height: 44px;

  /* 🌕/Orange/500 */

  border-radius: 2px;
  border: none;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 1;
  margin: 0px 8px;

  /* UI/body1/Bold */

  font-family: iOS Display Figma;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  color: #ffffff;
  background: #00b3ff;

  &.cancel {
    color: rgb(107, 107, 107);
    background: rgb(248, 248, 248);
  }

  &:hover {
    cursor: pointer;
    background-color: #f63105;
  }

  &.cancel:hover {
    background-color: rgb(240, 240, 240);
  }
`;
