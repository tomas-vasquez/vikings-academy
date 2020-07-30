
import {
  genKey,
  convertToRaw
} from "draft-js";

import { editorStateFromRaw } from "lib/megadraft/Megadraft";

function insertDataBlock(editorState, data) {
  let raw = convertToRaw(editorState.getCurrentContent());
  raw.blocks.push({
    key: genKey(),
    type: "atomic",
    text: " ",
    characterList: [],
    data,
  });

  return editorStateFromRaw(raw);
}

export default insertDataBlock;
