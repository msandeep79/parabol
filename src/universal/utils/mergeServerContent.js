const getBestFitSelection = (oldContentState, newContentState, oldKey, oldOffset) => {
  let currentKey = oldKey;
  let keyInNewContent = newContentState.getBlockForKey(currentKey);
  while (!keyInNewContent && currentKey !== null) {
    currentKey = oldContentState.getBlockBefore(currentKey);
    keyInNewContent = newContentState.getBlockBefore(currentKey);
  }
  const contentBlock = keyInNewContent || newContentState.getFirstBlock();
  const key = contentBlock.getKey();
  const blockLength = contentBlock.getText().length;
  const offset = currentKey === oldKey ? Math.min(blockLength, oldOffset) : blockLength;
  return {key, offset};
};

const getMergedSelection = (oldEditorState, newContentState) => {
  const oldSelection = oldEditorState.getSelection();
  const oldContent = oldEditorState.getCurrentContent();
  const oldStartKey = oldSelection.getStartKey();
  const oldStartOffset = oldSelection.getStartOffset();
  const {offset: startOffset, key: startKey} =
    getBestFitSelection(oldContent, newContentState, oldStartKey, oldStartOffset);
  if (oldSelection.isCollapsed()) {
    return oldSelection.merge({
      anchorOffset: startOffset,
      focusOffset: startOffset,
      anchorKey: startKey,
      focusKey: startKey
    })
  } else {
    const {offset: endOffset, key: endKey} =
      getBestFitSelection(oldContent, newContentState, oldSelection.getEndKey(), oldSelection.getEndOffset());
    return oldSelection.merge({
      anchorOffset: startOffset,
      focusOffset: endOffset,
      anchorKey: startKey,
      focusKey: endKey
    })
  }
};

const mergeServerContent = (oldEditorState, newContentState) => {
  // unless it's being simultaneously edited, don't bother setting selection
  if (!oldEditorState.getSelection().getHasFocus()) {
    return newContentState;
  }
  return newContentState.merge({
    selectionAfter: getMergedSelection(oldEditorState, newContentState)
    //selectionBefore: updatedSelectionState
  });
};

export default mergeServerContent;