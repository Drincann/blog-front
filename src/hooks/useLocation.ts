import { useEffect, useState } from "react"

// hack wondow.history.pushState
const _pushState_hacked_ = window.history.pushState;
window.history.pushState = function (state, title, url) {
  _pushState_hacked_.call(window.history, state, title, url);
  window.dispatchEvent(new Event('popstate'));
};

export const useLocation = () => {
  const [location, setLocation] = useState(window.location)

  useEffect(() => {
    const handler = () => {
      setLocation(window.location)
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  return location
}