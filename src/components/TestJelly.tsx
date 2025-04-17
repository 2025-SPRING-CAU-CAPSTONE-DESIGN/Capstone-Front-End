const TestJelly = () => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "radial-gradient(circle at 30% 30%, #b8f3a9, #48bb78, #22543d)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "80px",
          fontWeight: "900",
          textShadow: `
            0 1px 0 #fff,
            0 2px 1px rgba(0, 0, 0, 0.2),
            0 0 15px rgba(255, 255, 255, 0.3)
          `,
          display: "inline-block", // ✅ 요거 추가!
        }}
      >
        이야기숲
      </div>
    </div>
  );
};
