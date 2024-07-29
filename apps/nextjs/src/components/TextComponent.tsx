import { doc, getDoc } from "firebase/firestore";

import { db } from "~/firebase";

export const TextComponent = async () => {
  // const docRef = doc(db, "users", "yHKyi99CvZV5RZLM2c6NpOPyZMQ2");
  // const docSnap = await getDoc(docRef);
  //
  // console.log(docSnap.data());

  return <div className={"text-secondary"}>hello world</div>;
};
