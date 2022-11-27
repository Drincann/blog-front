import { useEffect, useState } from "react"
import { useLocation } from "./useLocation"

const getQuerys = (): Record<string, any> => {
  const querys = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  querys.forEach((value, key) => result[key] = value);
  return result;
}
const setQuerys = (querys: Record<string, string>): void => {
  const currQuerys = getQuerys();
  const newQuerys = { ...getQuerys(), ...querys };

  if (Object.keys(newQuerys).length === Object.keys(currQuerys).length
    && Object.keys(newQuerys).every(key => newQuerys[key] === currQuerys[key])) {
    return;
  }
  window.history.pushState(null, '', `?${new URLSearchParams(newQuerys).toString()}`);
}

export const useQuerys = <T>() => {
  const location = useLocation();
  let [querysObj, setQuerysObj] = useState<Record<string, any>>(getQuerys());

  useEffect(
    () => {
      const handler = () => setQuerysObj(getQuerys());
      window.addEventListener('popstate', handler)
      return () => window.removeEventListener('popstate', handler)
    }, [location]
  )

  return [querysObj, setQuerys] as [T, typeof setQuerys];
}
