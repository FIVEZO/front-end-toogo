import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러가 발생한 경우 콘솔에 에러 정보를 출력합니다.
    // console.error("에러가 발생했습니다:", error);
    // console.error("에러 정보:", errorInfo);

    // 에러 상태를 업데이트하여 렌더링을 다시 트리거합니다.
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생한 경우 대체 UI를 렌더링할 수 있습니다.
      return (
        <div>
          <h1>에러가 발생했습니다.</h1>
          <p>에러를 콘솔로 출력했습니다. 앱을 새로고침해보세요.</p>
        </div>
      );
    }

    // 에러가 없으면 자식 컴포넌트를 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
