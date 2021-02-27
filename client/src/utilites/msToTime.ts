const msToTime: { (time: number): string } = (time) => {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (60 * 1000)) % 60);
  const hours = Math.floor((time / (3600 * 1000)) % 3600);

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export default msToTime;
