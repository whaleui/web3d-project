const Test = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">测试页面</h1>
      <p className="text-lg text-center">如果您看到这个页面，说明React渲染正常</p>
      <div className="mt-8 bg-primary text-white p-4 rounded-lg text-center">
        <p>这是一个测试卡片，用于验证样式是否正常工作</p>
      </div>
    </div>
  );
};

export default Test;