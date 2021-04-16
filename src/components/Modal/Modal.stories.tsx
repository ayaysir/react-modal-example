import React from 'react';
import { Modal, ModalProps } from './Modal';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    componentSubtitle:
      '모달 팝업 창입니다. 기본적인 제목 부분과 끄기 아이콘이 구현되어 있고, 내용 부분은 사용자가 커스터마이징 할 수 있습니다.',
  },
};

export const BasicUsage = (args: ModalProps) => <Modal {...args} />;
