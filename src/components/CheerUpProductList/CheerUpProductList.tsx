import React, { useState } from 'react';
import styled from 'styled-components';
import { ProductList } from '../ProductList';
import { CheerUpProductItem, Product } from '../CheerUpProductItem';
import { useCheerUpProductList } from './useCheerUpProductList';
import { CheerUpModalWrapper } from '../Modal/CheerUpModalWrapper';

export const CheerUpProductList: React.FC = () => {
  const { data, loading } = useCheerUpProductList();

  /**
   * 모달 제어 부분
   * - selectedItem: 선택된 아이템을 모달창으로 넘김
   * - resetSelectedItem: 선택된 아이템을 초기화
   * - CheerUpModalWrapper: 응원하기 관련 모달 컴포넌트
   */
  const [selectedItem, setSelectedItem] = useState<Product>();

  const handleItemClick = (item: Product) => {
    setSelectedItem(item);
  };

  const resetSelectedItem = () => {
    setSelectedItem(undefined);
  };

  return (
    <Container>
      {!loading && (
        <ProductList>
          {data.map(item => (
            <CheerUpProductItem key={item.id} product={item} onItemClick={handleItemClick} />
          ))}
        </ProductList>
      )}
      <CheerUpModalWrapper currentItem={selectedItem!} resetSelectedItem={resetSelectedItem} />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  width: 100%;
  margin: 0px auto;
  min-height: 100vh;
`;
