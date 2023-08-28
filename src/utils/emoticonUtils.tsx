import { ReactComponent as Winking1 } from "../components/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../components/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../components/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../components/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../components/assets/emoticon/winking5.svg";


type EmoticonComponents = {
    [key: string]: JSX.Element;
  };

  const selectedEmoticon= (emoticon:string | null) => {
    const emoticonComponents: EmoticonComponents = {
      1: <Winking1 />,
      2: <Winking2 />,
      3: <Winking3 />,
      4: <Winking4 />,
      5: <Winking5 />,
    };
    return emoticon ? emoticonComponents[emoticon] : null;
  }