import React from 'react';
import styled from 'styled-components';

const ButtonFlat = styled.div`
  position: relative;
  width: ${({ theme }) => theme.buttonWidth};
  height: ${({ theme }) => theme.buttonHeight};
  margin: 0;
  perspective: 1000px;
  display: flex;
  cursor: pointer;
`;

const ButtonFlatA = styled.a`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transform: translateZ(calc(-${({ theme }) => theme.buttonHeight} / 2));
  transition: transform ${({ theme }) => theme.transitionSpeed};

  &::before,
  &::after {
    justify-content: center;
    align-items: center;
    margin: 0;
    width: ${({ theme }) => theme.buttonWidth};
    height: ${({ theme }) => theme.buttonHeight};
    position: absolute;
    border: ${({ theme }) => theme.defaultBorderLight} solid
      ${({ theme }) => theme.text};
    box-sizing: border-box;
    box-shadow: inset 0px 0px 0px 1px #fff;
    content: attr(title);
    display: flex;
  }

  &::before {
    background-color: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.text};
    transform: rotateY(0deg)
      translateZ(calc(${({ theme }) => theme.buttonHeight} / 2));
  }

  &::after {
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.body};
    transform: rotateX(90deg)
      translateZ(calc(${({ theme }) => theme.buttonHeight} / 2));
  }

  &:hover {
    transform: translateZ(calc(-${({ theme }) => theme.buttonHeight} / 2))
      rotateX(-90deg);
  }
`;

interface Props {
  title: string;
  href?: string;
  alt?: string;
  rel?: string;
  target?: string;
}

export default function SquareButton({
  title,
  href,
  alt = '',
  rel = 'noreferrer',
  target = '_blank',
}: Props) {
  return (
    <ButtonFlat>
      <ButtonFlatA
        title={title}
        href={href}
        rel={rel}
        alt={alt}
        target={target}
      />
    </ButtonFlat>
  );
}
