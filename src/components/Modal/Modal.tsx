import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import closeBtn from '../../assets/close.svg';

type ContainerProps = {
  /** true인 경우 모달 창이 생성되면서 보여집니다. (페이드인 애니메이션 기본 내장),
   * false인 경우 애니메이션 없이 DOM Tree에서 제거됩니다. */
  isDisplay: boolean;
  /** true인 경우 페이드 아웃 애니메이션이 200ms(0.2s) 진행됩니다.
   * false인 경우 아무 작업도 실행하지 않습니다. */
  isModalFadeOut: boolean;
};

export type ModalProps = ContainerProps & {
  /** 끄기(x) 버튼을 눌렀을 때 사용할 콜백 함수를 소환합니다. */
  onClose: () => void;
  /** 모달 창의 제목을 설정합니다. */
  title: string;
};

/**
 * - isDisplay는 true인 경우 브라우저 DOM tree 에 컴포넌트를 추가하고 모달 창을 보여줍니다. 페이드 인 애니메이션이 기본으로 포함되어 있습니다.
 * - isDisplay가 false인 경우와 isModalFadeOut을 조합하여 페이드 아웃 애니메이션을 구현하고 컴포넌트를 제거할 수 있습니다.
 * - 타이틀과 끄기 버튼(x)이 기본적으로 구현되어 있으며 children 속성을 통해 내용을 사용자화 할 수 있습니다.
 * - onClose 함수는 현재 컴포넌트 또는 상위 컴포넌트에서 isDisplay 속성과 isModalFadeOut 속성을 조합하여 모달창 끄기 기능을 구현할 수 있습니다.
 */
export const Modal: React.FC<ModalProps> = ({ isDisplay, isModalFadeOut, children, onClose, title }) => {
  const handleOverlayClick = () => {
    onClose();
  };

  useEffect(() => {
    const closeModalByEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModalByEscape);
    return () => window.removeEventListener('keydown', closeModalByEscape);
  }, [onClose]);

  // 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      {isDisplay && (
        <Container tabIndex={0} isDisplay={isDisplay} isModalFadeOut={isModalFadeOut}>
          <ModalOverlay onClick={handleOverlayClick} tabIndex={-1} />
          <ModalWindow>
            <ModalTitle>{title || 'Modal Title'}</ModalTitle>
            <ModalCloseButton onClick={onClose} />
            <ModalChildren>{children}</ModalChildren>
          </ModalWindow>
        </Container>
      )}
    </>
  );
};

const boxFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const boxFadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  visibility: ${({ isModalFadeOut }: ContainerProps) => (isModalFadeOut ? 'hidden' : 'visible')};
  animation: ${({ isModalFadeOut }: ContainerProps) => (isModalFadeOut ? boxFadeOut : boxFadeIn)} 0.2s linear;
  transition: visibility 0.2s linear;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.549);

  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalWindow = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 50%;
  width: 480px;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;

  /* 모바일 바텀싯*/
  @media (max-width: 1023px) {
    top: 100%;
    width: 100%;
    transform: translate(-50%, -96%);
  }

  @media (max-width: 450px) {
    height: auto;
    padding-bottom: 5px;
  }
`;

const ModalTitle = styled.div`
  height: 36px;

  font-family: iOS Display Figma;
  font-style: normal;
  font-weight: 800;
  font-size: 26px;
  line-height: 36px;
  /* identical to box height, or 138% */

  @media (max-width: 450px) {
    font-size: 22px;
  }

  @media (max-width: 320px) {
    font-size: 18px;
  }

  letter-spacing: -0.01em;
  font-feature-settings: 'case' on, 'ss02' on;

  /* 🌕/Gray/Black */

  color: #000000;

  /* Inside Auto Layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 32px 32px;
`;

const ModalCloseButton = styled.div`
  width: 24px;
  height: 24px;
  background: url(${closeBtn});
  position: absolute;
  top: 33.5px;
  right: 32px;
  cursor: pointer;
`;

const ModalChildren = styled.div`
  box-sizing: content-box;
`;
