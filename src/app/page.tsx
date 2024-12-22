

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl font-bold">Hello there</h1>
          <h2 className="mb-5 text-5xl font-bold"> Product Mix</h2>
          <p className="mb-5">
          The Product Mix app is a modern web application that leverages server actions to securely handle product management directly on the server side. This app allows users to store, organize, and manage different products in a database using intuitive CRUD operations.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
  </div>
  );
}
