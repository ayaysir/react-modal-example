import React from 'react';
import styled from 'styled-components';

export type Product = {
  id: string;
  photoUrl: string;
  title: string;
  likeCount: number;
};

type Props = {
  product: Product;
  onItemClick: any;
};

export const CheerUpProductItem: React.FC<Props> = ({ product, onItemClick }) => {
  return (
    <Container>
      <CoverImage>
        <img src={product.photoUrl} alt={product.title} />
      </CoverImage>
      <Title>{product.title}</Title>
      <CheerUpButton onClick={() => onItemClick(product)}>응원하기</CheerUpButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 32px;
  flex-direction: column;

  @media (min-width: 960px) {
    width: 33%;
  }
`;

const CoverImage = styled.span`
  flex: 1;
  position: relative;
  border-radius: 3px;
  margin-bottom: 8px;
  overflow: hidden;
  padding-top: 75%;

  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: -0.15px;
  margin: 0 0 6px;
  color: rgb(26, 26, 26);
  overflow: hidden;
`;

const CheerUpButton = styled.button`
  color: rgb(255, 77, 0);
  background-color: rgba(255, 77, 0, 0.1);
  width: 100%;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.2px;
  height: 40px;
  padding: 0px 16px;
  border: 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 77, 0, 0.2);
  }
`;
