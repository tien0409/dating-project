import { useEffect, useRef } from "react";

const makeCancelable = <T,>(promise: Promise<T>) => {
  let isCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    return promise.then(
      (val) => (isCanceled ? resolve({ isCanceled, val } as T) : resolve(val)),
      (error) => (isCanceled ? reject({ isCanceled, error }) : reject(error)),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      isCanceled = true;
    },
  };
};

type MakeCancelableType = ReturnType<typeof makeCancelable>;

const useCancelPromise = (cancelable = makeCancelable) => {
  const promises = useRef<MakeCancelableType[]>();

  const cancelablePromise = <T = undefined,>(promise: Promise<T>) => {
    const currentPromise = cancelable<T>(promise);
    promises.current?.push(currentPromise);

    return currentPromise.promise;
  };

  useEffect(() => {
    promises.current = promises.current || [];

    return () => {
      promises.current?.forEach((promise) => promise.cancel());
      promises.current = [];
    };
  }, []);

  return {
    cancelablePromise,
  };
};

export default useCancelPromise;
