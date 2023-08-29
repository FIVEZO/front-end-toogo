import { ReactComponent as Winking1 } from "../components/assets/emoticon/winking1.svg";
import { ReactComponent as Winking2 } from "../components/assets/emoticon/winking2.svg";
import { ReactComponent as Winking3 } from "../components/assets/emoticon/winking3.svg";
import { ReactComponent as Winking4 } from "../components/assets/emoticon/winking4.svg";
import { ReactComponent as Winking5 } from "../components/assets/emoticon/winking5.svg";
import { ReactComponent as Winking1Big } from "../components/assets/emoticon/winking1big.svg";
import { ReactComponent as Winking2Big } from "../components/assets/emoticon/winking2big.svg";
import { ReactComponent as Winking3Big } from "../components/assets/emoticon/winking3big.svg";
import { ReactComponent as Winking4Big } from "../components/assets/emoticon/winking4big.svg";
import { ReactComponent as Winking5Big } from "../components/assets/emoticon/winking5big.svg";

type EmoticonComponents = {
    [key: string]: JSX.Element;
  };

export  const selectedEmoticon= (emoticon:string | null) => {
    const emoticonComponents: EmoticonComponents = {
      1: <Winking1 />,
      2: <Winking2 />,
      3: <Winking3 />,
      4: <Winking4 />,
      5: <Winking5 />,
    };
    return emoticon ? emoticonComponents[emoticon] : null;
  }

export const selectedEmoticonBig= (emoticon:string | null) => {
    const emoticonComponents: EmoticonComponents = {
    1: <Winking1Big />,
    2: <Winking2Big />,
    3: <Winking3Big />,
    4: <Winking4Big />,
    5: <Winking5Big />,
    };
    return emoticon ? emoticonComponents[emoticon] : null;
  }