import * as Scrivito from 'scrivito';

function useScrivito (dependent) {
  return function () {
    return Scrivito.load(() => {
      return dependent();
    });
  };
}

export default useScrivito;
