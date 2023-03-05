import { MyHeader } from "./Header";
import { MyFooter } from "./Footer";
import type { ReactElement } from "react";
function MyContainer({ children}: {children: ReactElement}) {
  return (
    <>
      <MyHeader />
      {children}
      <MyFooter
        data={[
          {
            title: "title",
            links: [{ label: "linksLabel", link: "/" }],
          },
        ]}
      />
    </>
  );
}

export default MyContainer;
