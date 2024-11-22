import React, { useState } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Slider = styled.div`
  width: 100%;
  max-width: 300px;
  height: 40px;
  background-color: #e6e6e6;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Handle = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.success ? '#4caf50' : '#757575'};
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transition: left 0.3s ease-in-out, background-color 0.3s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const Track = styled.div`
  width: ${(props) => props.width}px;
  height: 40px;
  background-color: ${props => props.success ? '#cddc39' : '#e6e6e6'};
  border-radius: 20px;
  position: absolute;
  left: 0;
  top: 0;
  transition: width 0.3s ease-in-out, background-color 0.3s;
`;

const Feedback = styled.p`
  margin-top: 10px;
  color: ${props => props.success ? '#4caf50' : '#f44336'};
  font-size: 14px;
  text-align: center;
`;

const ResetButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const SliderVerification = ({ onVerify }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [handlePosition, setHandlePosition] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const startX = e.clientX;
        const sliderWidth = e.target.clientWidth;

        const onMouseMove = (moveEvent) => {
            if (!isDragging) return;
            const x = moveEvent.clientX - startX;
            if (x > 0 && x <= sliderWidth) {
                setHandlePosition(x);
            }
            if (x >= sliderWidth - 40) {
                setIsVerified(true);
                setFeedback('验证成功！');
                onVerify(true);
            }
        };

        const onMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            if (!isVerified) {
                setHandlePosition(0);
                setFeedback('请滑动滑块完成验证');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    const resetVerification = () => {
        setIsVerified(false);
        setHandlePosition(0);
        setFeedback('');
    };

    return (
        <SliderContainer>
            <Slider onMouseDown={handleMouseDown}>
                <Track width={handlePosition} success={isVerified} />
                <Handle style={{ left: `${handlePosition}px` }} success={isVerified} />
            </Slider>
            {feedback && <Feedback success={isVerified}>{feedback}</Feedback>}
            {!isVerified && <ResetButton onClick={resetVerification}>重试</ResetButton>}
        </SliderContainer>
    );
};

export default SliderVerification;