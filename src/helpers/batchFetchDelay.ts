const batchFetchWithDelay = async () => {
  let temp = gamesList.games.slice(count - 10, count);
  console.log("GAAAMES: ", abortController);
  while (i <= count && !abortController.signal.aborted) {
    let results = [];
    let batch = [];
    for (let j = 0; j < 3; j++) {
      let thisParam = temp.pop();
      if (thisParam) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_LOCAL_GAMES_API_BASE_DOMAIN}/getGameInfo/${
              thisParam.appid
            }`,
            { signal: abortController.signal },
          );

          const responseData = await response.json();

          if (responseData.success) {
            let old = [...batch];
            console.log("GARBALDI: ", responseData);

            batch = old.concat(responseData.data);
          }
        } catch (error) {
          console.log("ABORT: ", abortController);
          if (abortController.signal.aborted) return;

          if (error instanceof Error) setErrorMsg(() => error?.message);
        }
      }
      i = i + j;
    }
    let old = [...results];
    results = old.concat(await Promise.allSettled(batch));
    const newGamesList = results.map((item) => item.value);
    return newGamesList;
  }
};

export default batchFetchWithDelay;
