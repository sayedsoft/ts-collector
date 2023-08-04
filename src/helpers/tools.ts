const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const asyncApp = async (ms: number): Promise<void> => {
  return await sleep(ms).then(async () => {
    await asyncApp(ms);
  });
};

export { asyncApp, sleep };
