const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const HomePage = async () => {
  await delay(4000);
  return <></>;
};

export default HomePage;
