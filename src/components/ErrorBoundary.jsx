import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[SlideForge] UI error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <span className="error-emoji">😵</span>
          <h1>Ôi, có lỗi xảy ra</h1>
          <p>Giao diện gặp sự cố bất ngờ. Hãy tải lại trang để thử lại nhé.</p>
          <button className="btn primary" onClick={() => window.location.reload()}>
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
