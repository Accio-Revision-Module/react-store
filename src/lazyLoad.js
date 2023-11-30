import { lazy } from "react";

export default function lazyLoad(path, namedComponent) {
  if (!namedComponent) {
    return lazy(() => import(/* @vite-ignore */ path));
  } else {
    return lazy(() =>
      import(/* @vite-ignore */ path).then((module) => {
        return {
          default: module[namedComponent],
        };
      }),
    );
  }
}
