import styled from 'styled-components';
import { keyframes } from 'styled-components';

export const cloud = keyframes`
  0% {
      transform: translate(0%, -50%);
  }
  50% {
      transform: translate(-50%, -50%);
  }
  100% {
      transform: translate(0%, -50%);
  }
`;

export const twinkle = keyframes`
  50% { opacity: 0.2; }
`;

export const Switch = styled.div`
  display: inline-block;
  position: relative;
`;

export const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 60px;
  background-color: ${({ theme }) => theme.switchBackground};
  border: 5px solid ${({ theme }) => theme.switchBorder};
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.46, 0.03, 0.52, 0.96);
`;

export const SwitchIndicator = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) translateX(-72%);
  display: block;
  width: 40px;
  height: 40px;
  background-image: url('/images/en.svg');
  background-size: 40px;
  border-radius: 9999px;
`;

export const SwitchDecoration = styled.span`
  position: absolute;
  top: 65%;
  left: 50%;
  display: block;
  width: 5px;
  height: 5px;
  background-color: #ffffff;
  border-radius: 9999px;
  animation: ${twinkle} 0.8s infinite -0.6s;

  &::before,
  &::after {
    position: absolute;
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #ffffff;
    border-radius: 9999px;
  }

  &::before {
    top: -20px;
    left: 10px;
    opacity: 1;
    animation: ${twinkle} 0.6s infinite;
  }

  &::after {
    top: -7px;
    left: 30px;
    animation: ${twinkle} 0.6s infinite -0.2s;
  }
`;

export const SwitchInput = styled.input`
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;

  &:checked {
    margin: 100px;
    + ${SwitchLabel} {
      background-color: ${({ theme }) => theme.switchBackground};
      border-color: ${({ theme }) => theme.switchBorder};

      ${SwitchIndicator} {
        background-color: #ecd21f;
        box-shadow: none;
        transform: translate(-50%, -50%) translateX(72%);
        background-image: url('/images/pt.svg');

        &::before,
        &::after {
          display: none;
        }
      }
      ${SwitchDecoration} {
        top: 50%;
        transform: translate(0%, -50%);
        animation: ${cloud} 8s linear infinite;

        width: 20px;
        height: 20px;

        &::before {
          width: 10px;
          height: 10px;
          top: auto;
          bottom: 0;
          left: -8px;
          animation: none;
        }

        &::after {
          width: 15px;
          height: 15px;
          top: auto;
          bottom: 0;
          left: 16px;
          animation: none;
        }

        &,
        &::before,
        &::after {
          border-radius: 9999px 9999px 0 0;
        }

        &::after {
          border-bottom-right-radius: 9999px;
        }
      }
    }
  }
`;
