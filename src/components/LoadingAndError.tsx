import React from "react";
import Spinner from "./Spinner";

interface LoadingAndErrorProps {
  isLoading: boolean;
  isError: boolean;
}

const LoadingAndError: React.FC<LoadingAndErrorProps> = ({ isLoading, isError }) => {
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return null;
};

export default LoadingAndError;

// ----------------------- 사용법
// <LoadingAndError isLoading={isLoading} isError={isError} />
