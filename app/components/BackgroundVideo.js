const BackgroundVideo = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video autoPlay loop muted className="w-full h-full object-cover">
        <source src="/videos/background.mp4" type="video/mp4" />
        Video pas supporter
      </video>
      <div className="absolute inset-0"></div>{" "}
      
    </div>
  );
};

export default BackgroundVideo;
